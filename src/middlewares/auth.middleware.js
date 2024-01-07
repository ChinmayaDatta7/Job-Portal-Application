import { UserModel } from "../models/user.model.js";

const auth = (req, res, next) => {
  //Check if Authorization header is set
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Unauthorized");
  }
  console.log(authHeader);

  //Extract the credentials from the header
  const encodedCred = authHeader.split(" ")[1];
  //   const encodedCred = authHeader.replace("Basic ", "");
  console.log(encodedCred);

  //Decode the credentials
  const decodedCred = Buffer.from(encodedCred, "base64").toString("utf8");
  console.log(decodedCred);

  const [email, password] = decodedCred.split(":");
  const user = UserModel.getAll().find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  req.user = user;
  next();
};

export default auth;
