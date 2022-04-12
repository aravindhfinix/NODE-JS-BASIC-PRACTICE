const express=require('express')
const app=express();
const mongoose=require('mongoose');
const {requireAuth } = require('../middle ware/veify token')
const schema=require('../models/schema')
app.use(express.json())
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
app.use(express.urlencoded({extended:true}))



exports.show=(req,res)=>{res.send('hello world')}
app.post('/sign-up',async(req,res)=>{
  const {email,name,password}=req.body;
  try{
    const user= await schema.create({email,name,password})
    console.log(user)
    res.send(user)
  }
  catch(err){
         res.send(err.message)
     }
  });
  app.post('/login',async (req,res,next) => {
    schema.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length <1){
            return res.status(401).json({
                message : 'Auth failed'
  
            });
            
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
            
            if(result){
               const token = jwt.sign({
                    email:user[0].email,
                    userId : user[0]._id
                },'secret key',
                {
                    expiresIn : "1h"
                });
                return res.status(200).json({
                    message : "Auth Successful",
                    token : token
                })
            }
            res.status(401).json({
                message :'Invalid Password  '
            })
  
        });   
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
  
    });
  
  
  }); 
//update user details
app.patch('/users/update/:id',async(req,res)=>{
    const id = req.params.id
    await schema.findOneAndUpdate({id:id},{$set:req.body} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
})
//delete user
app.delete('/user/delete/:id',async(req,res)=>{
    const id = req.params.id
    await schema.deleteOne({id:id} )
    .exec()
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})

})

