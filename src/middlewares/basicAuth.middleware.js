const basicAuth = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else res.redirect("/");
};

export default basicAuth;
