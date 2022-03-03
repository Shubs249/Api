//During the test the env variable is set to test
process.env.NODE_ENV="test";

let Patient=require("../models/patient");

//Require dev dependencies
let chai=require("chai");
let chaiHTTP=require("chai-http");
let server=require("../index");

let should=chai.should();

chai.use(chaiHTTP);
//parent block
describe("Patients Report Testing:", () => {
    let Token ="sdhu123.shuhbamssd12h2h.shdine2-sdfklj4-heritos5";
    let auth = "authhh "+Token;
    const patientID = "shubhs2345"; //patient1
    /*
        * Test the /POST route
    */
    //Incase dr is not authorised
    describe("POST /api/v1/patients/id/create_report", () => {
      it("Error because dr is not Authorized:", (done) => {
        let report = {
          status: 0,
          dr: "navasl2sd3" ,//id of doctor
        };
  
        chai
          .request(server)
          .post(`/api/v1/patients/${patientID}/create_report`)
          .send(report)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
  
    //field incomplete or missing
    describe("POST /api/v1/patients/id/create_report", () => {
      it("Error, Incomplete data:", (done) => {
        let report = {
            status: 0,
            
        };
  
        chai
          .request(server)
          .post(`/api/v1/patients/${patientID}/create_report`)
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", auth)
          .send(report)
          .end((err, res) => {
            res.should.have.status(206);
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql("Incomplete data provided");
            done();
          });
      });
    });
  
    //report created in Database
    describe("POST /api/v1/patients/id/create_report", () => {
      it("Report Successfully Created:", (done) => {
        let report = {
          status: 0,
          dr: "navasl2sd3" ,
        };
  
        chai
          .request(server)
          .post(`/api/v1/patients/${patientID}/create_report`)
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", auth)
          .send(report)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql("Report successfully Created");
            done();
          });
      });
    });
  });
  