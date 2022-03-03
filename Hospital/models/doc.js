//require mongoose
const mongoose=require('mongoose');  
//drs Schema       
const drSchema=new mongoose.Schema({
    name:{                                      
        type:String,
        required:true
    },
    username:{                                   
        type:String,
        required:true,
        unique:true    
    },
    password:{                                  
        type:String,
        required:true
    } 
},
{
    timestamps:true                             
});

// exports user
const dr=mongoose.model('dr',drSchema);
module.exports=dr;