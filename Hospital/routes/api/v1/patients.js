const express=require('express');
const router=express.Router();
const passport=require('passport');
const patients_control=require('../../../controllers/api/v1/patients_control');

router.post('/register',passport.authenticate('jwt',{session:false}),patients_control.register);
router.post('/:id/create_report',passport.authenticate('jwt',{session:false}),patients_control.createReport);
router.get('/:id/all_reports',patients_control.allReports);

module.exports=router;