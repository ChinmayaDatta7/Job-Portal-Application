import { JobModel } from "../models/job.model.js";
import { ApplicantModel } from "../models/applicant.model.js";

export default class JobController {
  //controller for rendering the add job form
  static getAddJob(req, res) {
    return res.render("add_job");
  }

  //controller for posting the new job
  static postjob(req, res) {
    const { designation, description, location, name, salary, openings, date } =
      req.body;
    const skills = req.body.skills.split(",");
    const applicants = 0;
    const job = new JobModel(
      designation,
      description,
      location,
      name,
      salary,
      openings,
      applicants,
      skills,
      date,
      Date.now().toString()
    );
    const jobs = JobModel.createJob(job);
    return res.redirect("/");
  }

  //controller for rendering the index page
  static getJobs(req, res) {
    const jobs = JobModel.getJobs();
    return res.render("index", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //controller for searching for a job based on the designation or name of the company
  static searchJob(req, res) {
    const string = req.body.search;
    const filteredJobs = JobModel.getJobsByString(string);
    return res.render("index", {
      jobs: filteredJobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //controller for rendering the job details page
  static getJobById(req, res) {
    const id = req.params.id;
    const job = JobModel.getJobById(id);
    return res.render("job_details", {
      job: job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //controller for rendering the edit job form
  static getEditJob(req, res) {
    const id = req.params.id;
    const job = JobModel.getJobById(id);
    return res.render("edit_job.ejs", {
      job: job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //controller for posting the edited job
  static postEditJob(req, res) {
    const id = req.params.id;
    const { designation, description, location, name, salary, openings, date } =
      req.body;
    const skills = req.body.skills.split(",");
    const applicants = JobModel.getApplicantsByJobId(id);
    const job = new JobModel(
      designation,
      description,
      location,
      name,
      salary,
      openings,
      applicants,
      skills,
      date,
      id
    );
    JobModel.updateJobById(id, job);
    return res.redirect("/jobs");
  }

  //controller for deleting a job
  static deleteJobById(req, res) {
    const id = req.params.id;
    const jobs = JobModel.deleteJobById(id);
    return res.redirect("/jobs");
  }

  //controller for rendering the apply job form
  static getApplyJob(req, res) {
    const id = req.params.id;
    const job = JobModel.getJobById(id);
    return res.render("apply_job", {
      job: job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //controller for posting the application form for a job
  static applyJob(req, res) {
    const jobID = req.params.id;
    const { name, email, contact, address } = req.body;
    const resume = "resume/" + req.file.filename;
    const applicant = new ApplicantModel(
      name,
      email,
      contact,
      address,
      resume,
      jobID,
      Date.now().toString()
    );
    ApplicantModel.createApplicant(applicant);
    JobModel.addApplicant(jobID);
    return res.redirect("/");
  }

  //controller for rendering the applicants page
  static getApplicants(req, res) {
    const id = req.params.id;
    const applicants = ApplicantModel.getApplicants(id);
    return res.render("applicants", {
      applicants: applicants,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  //controller for deleting an applicant
  static deleteApplicantById(req, res) {
    const id = req.params.id;
    const applicant = ApplicantModel.getApplicantById(id);
    const jobID = applicant.jobID;
    JobModel.deleteApplicant(jobID);
    ApplicantModel.deleteApplicantById(id);
    return res.redirect("/applicants/" + jobID);
  }
}
