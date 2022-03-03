const clinicAdmin = require('../../../models/clinicAdmin');
const jwt = require('jsonwebtoken');

//Create/Register the clinicAdmin in db by using name,email and password
module.exports.register = async function(req, res){

    //Check if all field enter
    if(req.body.email==undefined || req.body.name==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }
    
    //Check if the clinicAdmin is already registered in db
    let Email = req.body.email;
    let clinicAdminExists = await clinicAdmin.findOne({email: Email});
    if(clinicAdminExists){
        clinicAdminExists = await clinicAdminExists.toObject();
        
        delete clinicAdminExists.password;
        return res.status(405).json({
            data:{
                clinicAdmin: clinicAdminExists
                
            },
            message: 'clinicAdmin already registered'
        });
    }
            
    try{
        let createdclinicAdmin = await (await clinicAdmin.create(req.body)).toObject();
        
        if(createdclinicAdmin){
            delete createdclinicAdmin.password;
            return res.status(200).json({
                data: {
                    clinicAdmin:createdclinicAdmin
                },
                message: 'Successfully registered'
            });
        }
        else{
            return res.status(500).json({
                message: ' Error'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: ' Error'
        });
    }
}

//Login for clinicAdmin using email and password, generate JWT token for clinicAdmin
module.exports.login = async function(req, res){
    
    if(req.body.email==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
            });
        }

    try{
        let clinicAdmin = await clinicAdmin.findOne({email:req.body.email});
        if(clinicAdmin){
            let pass = req.body.password;
            let pwdDb = clinicAdmin.password;
            if(pass==pwdDb){
                return res.status(300).json({
                    data:{
                        token: jwt.sign(clinicAdmin.toJSON(), 'hospitalapi', {expiresIn: 1000000})
                    }
                })
            }
        }
        return res.status(401).json({
            message:'Invalid Email or Password'
        });
    }
    catch(err){
        console.log(err);
        return res.status(600).json({
            message: ' Error'
        });
    }
}