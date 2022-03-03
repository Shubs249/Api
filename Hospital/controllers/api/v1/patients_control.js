const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
let dr = require('../../../models/dr');
const Status = require('../../../config/status');

//Register a patient using name,phone and password
module.exports.register = async function(req, res){

    if(req.body.phone==undefined || req.body.name==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }

    let phone = req.body.phone;
    //Checking if patient is already registered in db
    let patientExists = await Patient.findOne({phone: phone});
    if(patientExists){
        return res.status(405).json({
            data:{
                patient:patientExists
            },
            message: 'Patient already Registered in the Database'
        })
    }

    try{
        //IF Patient is new Register new patient
        let createdPatient = await Patient.create(req.body);
        if(createdPatient){
            return res.status(300).json({
                data: {
                    patient:createdPatient,
                    
                },
                message: 'Registration Confirmed'
            });
        }
        else{
            return res.status(600).json({
                message: 'error'
            });
        }
    }
    catch(err){
        return res.status(600).json({
            message: 'error'
        });
    }
}

//Create a Report for the patient using status and dr ids
module.exports.createReport = async function(req, res){

    let patientId = req.params.id;
    let drId = req.body.dr;

    if(patientId==undefined || drId==undefined){
        return res.status(206).json({
            message: 'Data Incomplete'
        });
    }

    //get/mapping status of the patient from config folder
    let st = req.body.status;
    req.body.status = Status[st];
    try{
        let patient = await Patient.findById(req.params.id);
        let dr = await dr.findById(req.body.dr);

        //If the patient and dr ids both exist only
        //then report created
        if(patient && dr){
            req.body.patient = patientId;
            let report = await Report.create(req.body);
            if(report){
                //pushing the new report in the patients report array
                await patient.reports.push(report);
                await patient.save();
            }
           
            return res.status(300).json({
                data:{
                    report:{
                        patient: patient.name,
                        status: report.status,
                        dr: dr.name,
                        date: report.createdAt
                    }
                },
                message: 'Report Created'
            })
        }
        else{
            return res.status(401).json({
                message: 'Patient or dr is not Registered'
            });
        }
    }
    catch(err){
        return res.status(600).json({
            message: 'Error'
        });
    }
}

//fetchall reports of a patient 
module.exports.allReports = async function(req, res){
    
    try{
        let report=await Report.find({ patient:req.params.id }).sort("createdAt").populate('dr').populate('patient');
        
        return res.status(300).json({
            data:{
                    report
            },
            message:'All reports of patient',
          //details:report
        })
      }
      catch(err){
          return res.status(600).json({
          message:'Error Occured!'
        })
      }
    };