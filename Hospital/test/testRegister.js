//env variable is set to test
process.env.NODE_ENV="test";

let Patient=require("../models/patient");

//dev dependencies
let chai=require("chai");
let chaiHTTP=require("chai-http");
let server=require("../index");

let should=chai.should();

chai.use(chaiHTTP);
//Parent block
describe("Patients Register Testing :", () => {
    let Token ="sdhu123.shuhbamssd12h2h.shdine2-sdfklj4-heritos5";
    let auth = "authhh "+Token;
  
    /*
        * Test the /POST route
    */
   //Dr not authorised
    describe("POST /api/v1/patients/register", () => {
      it("Error dr not Authorized:", (done) => {
        let patient = {
          name: "patient15",
          phone: 1234567,
        };
  
        chai
          .request(server)
          .post("/api/v1/patients/register")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .send(patient)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
  
  //Incomplete or missng data 
    describe("POST /api/v1/patients/register", () => {
      it("Error ; Incomplete data :", (done) => {
        let patient = {
          name: "patient12",
         
        };
  
        chai
          .request(server)
          .post("/api/v1/patients/register")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", auth)
          .send(patient)
          .end((err, res) => {
            res.should.have.status(206);
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql("Incomplete data provided");
            done();
          });
      });
    });
  
    //already registered patient
    describe("POST /api/v1/patients/register", () => {
      it("Patient already Exist:", (done) => {
        let patient = {
          name: "patient1",
          phone: 12456789,
        };
  
        chai
          .request(server)
          .post("/api/v1/patients/register")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", auth)
          .send(patient)
          .end((err, res) => {
            res.should.have.status(405);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql("Patient already Registered DB");
            done();
          });
      });
    });
  
   // New patient register
    describe("POST /api/v1/patients/register", () => {
      it("Patient Successfully Registered:", (done) => {
        let patient = {
          name: "patient21",
          phone: 13456789,
        };
  
        chai
          .request(server)
          .post("/api/v1/patients/register")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("Authorization", auth)
          .send(patient)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql(" Registration sucessfull");
            done();
          });
      });
    });
  });
  