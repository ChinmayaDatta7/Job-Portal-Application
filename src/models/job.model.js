import { ApplicantModel } from "./applicant.model.js";

export class JobModel {
  constructor(
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
  ) {
    this.designation = designation;
    this.description = description;
    this.location = location;
    this.name = name;
    this.salary = salary;
    this.openings = openings;
    this.applicants = applicants;
    this.skills = skills;
    this.date = date;
    this.id = id;
  }

  static createJob(job) {
    jobs.push(job);
    return jobs;
  }

  static addApplicant(id) {
    const job = JobModel.getJobById(id);
    job.applicants++;
  }

  static getJobs() {
    return jobs;
  }

  static getJobsByString(string) {
    const filteredJobs = [];
    jobs.forEach((job) => {
      if (
        job.designation.toLowerCase().includes(string.toLowerCase()) ||
        job.name.toLowerCase().includes(string.toLowerCase())
      ) {
        filteredJobs.push(job);
      }
    });
    return filteredJobs;
  }

  static getJobById(id) {
    return jobs.find((job) => job.id === id);
  }

  static getApplicants(id) {
    const job = JobModel.getJobById(id);
    return ApplicantModel.getApplicantsByJobId(job.id);
  }

  static getApplicantsByJobId(id) {
    const job = jobs.find((job) => job.id === id);
    const a = job.applicants;
    return a;
  }

  static deleteApplicant(id) {
    const job = JobModel.getJobById(id);
    job.applicants--;
  }

  static updateJobById(id, job) {
    const index = jobs.findIndex((job) => job.id === id);
    jobs[index] = job;
    return job;
  }

  static deleteJobById(id) {
    jobs = jobs.filter((job) => job.id !== id);
    return jobs;
  }
}

export var jobs = [
  new JobModel(
    "Software Developer",
    "We need a SDE to work on a new project",
    "Bangalore",
    "Facebook",
    "15LPA",
    "5",
    "2",
    "C++, Java, Python",
    "2024-04-30",
    "1"
  ),
  new JobModel(
    "MERN Developer",
    "We need a MERN Developer to work on a new project",
    "Hyderabad",
    "Google",
    "10LPA",
    "10",
    "0",
    "HTML,CSS, JavaScript, NodeJS, ReactJS, MongoDB",
    "2024-02-20",
    "2"
  ),
  new JobModel(
    "Human Resource Manager",
    "We need a HR to support our new employees",
    "Chennai",
    "Infosys",
    "20LPA",
    "8",
    "0",
    "Decision Making, Communication, Leadership, Problem Solving",
    "2024-01-13",
    "3"
  ),
];
