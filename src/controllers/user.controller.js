import { UserModel } from "../models/user.model.js";
import { JobModel } from "../models/job.model.js";

export default class UserController {
  //controller for adding new user
  static createUser(req, res) {
    const { name, email, password } = req.body;
    const user = new UserModel(name, email, password, Date.now().toString());
    UserModel.createUser(user);
    return res.redirect("/");
  }

  //controller for getting all users
  static showUsers(req, res) {
    const users = UserModel.getUsers();
    return res.send(users);
  }

  //controller for logging in
  static loginUser(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    if (user) {
      req.session.userEmail = user.email;
      req.session.userName = user.name;
      return res.redirect("/jobs");
    }
    return res.redirect("/");
  }

  //controller for logging out
  static logoutUser(req, res) {
    if (!req.session.userEmail) {
      return res.redirect("/");
    }
    req.session.destroy((err) => {
      if (err) console.log(err);
      return res.redirect("/");
    });
  }
}
