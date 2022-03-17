const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.json("roiuter is working");
    });
    router.get('/no1',(req,res)=>{
        res.json("roiuter no1 is working");
        });
       module.exports=router;
        
            