//env variable is set to test
process.env.NODE_ENV="test";

let Patient=require("../models/patient");

//dev dependencies
let chai=require("chai");
let chaiHTTP=require("chai-http");
let server=require("../index");

let should=chai.should();

chai.use(chaiHTTP);
//parent block
describe("Display all Patients Testing reoprt :", () => {
    const patientID = "shubhs2345"; //patient1
    /*
        * Test the /GET route
    */
    //case: Show all reports of the Patient
    describe("GET /api/v1/patients/id/all_reports", () => {
      it("All reports :", (done) => {
        chai
          .request(server)
          .get(`/api/v1/patients/${patientID}/all_reports`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message");
            res.body.should.have.property("message").eql("patient reports");
            done();
          });
      });
    });
  });
  