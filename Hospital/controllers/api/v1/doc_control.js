const dr = require('../../../models/dr');
const jwt = require('jsonwebtoken');

//Create/Register the dr in db by using name,email and password
module.exports.register = async function(req, res){

    //Check if all field enter
    if(req.body.email==undefined || req.body.name==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }
    
    //Check if the dr is already registered in db
    let Email = req.body.email;
    let drExists = await dr.findOne({email: Email});
    if(drExists){
        drExists = await drExists.toObject();
        
        delete drExists.password;
        return res.status(405).json({
            data:{
                dr: drExists
                
            },
            message: 'dr already registered'
        });
    }
            
    try{
        let createddr = await (await dr.create(req.body)).toObject();
        
        if(createddr){
            delete createddr.password;
            return res.status(200).json({
                data: {
                    dr:createddr
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

//Login for dr using email and password, generate JWT token for dr
module.exports.login = async function(req, res){
    
    if(req.body.email==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
            });
        }

    try{
        let dr = await dr.findOne({email:req.body.email});
        if(dr){
            let pass = req.body.password;
            let pwdDb = dr.password;
            if(pass==pwdDb){
                return res.status(200).json({
                    data:{
                        token: jwt.sign(dr.toJSON(), 'hospitalapi', {expiresIn: 1000000})
                    }
                })
            }
        }
        return res.status(401).json({
            message:'Invalid Email/Password'
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: ' Error'
        });
    }
}