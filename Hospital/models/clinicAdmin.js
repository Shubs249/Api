//require mongoose
const mongoose=require('mongoose');  
//clinicAdmins Schema       
const clinicAdminSchema=new mongoose.Schema({
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
const clinicAdmin=mongoose.model('clinicAdmin',clinicAdminSchema);
module.exports=clinicAdmin;