import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import ejsLayouts from "express-ejs-layouts";

//importing middlewares
import { upload } from "./src/middlewares/file-upload.middleware.js";
import basicAuth from "./src/middlewares/basicAuth.middleware.js";
import auth from "./src/middlewares/auth.middleware.js";

//importing controllers
import UserController from "./src/controllers/user.controller.js";
import JobController from "./src/controllers/job.controller.js";
import { jobs } from "./src/models/job.model.js";

const app = express();
const port = 3500;

// setup static file serving
app.use(express.static("public"));
// setup body parser
app.use(bodyParser.json());

// setup cookie parser
app.use(cookieParser());
// setup session
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// setup body parser
app.use(express.urlencoded({ extended: true }));

//setup view engine settings
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
//setup ejs layouts
// app.use(ejsLayouts);

// //Routes for user related operations
app.post("/register", UserController.createUser);
app.post("/login", UserController.loginUser);
app.get("/logout", UserController.logoutUser);
app.get("/users", UserController.showUsers);

//Routes for job related operations
app.get("/jobs", JobController.getJobs);
app.get("/job/:id", JobController.getJobById);

//Routes for searching a job based on the job designation(i.e. role) or comapny name
app.post("/search", JobController.searchJob);

//Rotes for posting a new job
app.get("/postjob", basicAuth, JobController.getAddJob);
app.post("/postjob", basicAuth, JobController.postjob);

//Routes for editing a job
app.get("/edit/:id", basicAuth, JobController.getEditJob);
app.post("/edit/:id", basicAuth, JobController.postEditJob);

//Routes for deleting a job
app.get("/delete/:id", basicAuth, JobController.deleteJobById);

//Routes for applying for a job
app.get("/apply/:id", JobController.getApplyJob);
app.post("/apply/:id", upload.single("resume"), JobController.applyJob);

//Routes for getting applicants for a job
app.get("/applicants/:id", JobController.getApplicants);

//Routes for deleting applicants for a job
app.get("/delete-applicant/:id", basicAuth, JobController.deleteApplicantById);

//Route for root page
app.get("/", (req, res) => {
  res.render("index", {
    jobs: jobs,
    userEmail: req.session.userEmail,
    userName: req.session.userName,
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
