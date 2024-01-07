import { JobModel } from "./job.model.js";

export class ApplicantModel {
  constructor(name, email, contact, address, resume, jobID, id) {
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.address = address;
    this.resume = resume;
    this.jobID = jobID;
    this.id = id;
  }

  static createApplicant(applicant) {
    applicants.push(applicant);
    console.log(applicant.jobID);
    // try {
    //   JobModel.addApplicant(applicant.jobID);
    // } catch (err) {
    //   console.log(err);
    // }
    return applicant;
  }

  static getApplicants(jobID) {
    const jobApplicants = [];
    applicants.forEach((applicant) => {
      if (applicant.jobID === jobID) {
        jobApplicants.push(applicant);
      }
    });
    return jobApplicants;
  }

  static applicantLength(jobID) {
    const jobApplicants = [];
    applicants.forEach((applicant) => {
      if (applicant.jobID === jobID) {
        jobApplicants.push(applicant);
      }
    });

    return jobApplicants.length;
  }

  static getApplicantById(id) {
    return applicants.find((applicant) => applicant.id === id);
  }

  static deleteApplicantById(id) {
    applicants = applicants.filter((applicant) => applicant.id !== id);
    return;
  }
}

var applicants = [
  new ApplicantModel(
    "Rahul",
    "rahul@gmail.com",
    "1234567890",
    "Miyapur,Hyderabad",
    "https://www.google.com",
    "1",
    "1"
  ),
  new ApplicantModel(
    "Nipun",
    "Nipun@gmail.com",
    "1234567890",
    "Machilipatnam,Andhra Pradesh",
    "https://www.google.com",
    "1",
    "2"
  ),
];
