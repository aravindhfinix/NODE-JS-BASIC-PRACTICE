const express=require('express')
const show=require('../controllers/user')
const router = express.Router();


router.get('/show',show)

module.exports=router