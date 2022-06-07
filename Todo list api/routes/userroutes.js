const express=require('express');
const router = express.Router();
const  user1 = require ('../controllers/v1.0.0/user')
const  user2 = require ('../controllers/v1.0.1/user')


router.post('/signup',user1.signup)
router.post('/v1.0.0/login',user1.login)
router.post('/v1.0.1/login',user2.login)
router.post('/update/:id',user1.update)
router.post('/delete/:id',user1.delete)
router.patch('/v1.0.0/verify',user1.otpverify)
router.post('/v1.0.1/verify',user2.otplogin)

module.exports=router 