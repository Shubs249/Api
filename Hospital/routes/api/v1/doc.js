const express=require('express');
const router=express.Router();
const doc_control=require('../../../controllers/api/v1/doc_control');

router.post('/register',doc_control.register);
router.post('/login',doc_control.login);


module.exports=router;