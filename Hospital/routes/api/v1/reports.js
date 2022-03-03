const express=require('express');
const router=express.Router();
const clinicAdmin_control=require('../../../controllers/api/v1/clinicAdmin_control');

router.post('/register',clinicAdmin_control.register);
router.post('/login',clinicAdmin_control.login);


module.exports=router;