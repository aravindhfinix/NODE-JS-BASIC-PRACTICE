const express=require('express')
const mongoose=require('mongoose')
const Schema=require('./schema')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {requireAuth } = require('./tokenmiddleware')
const { schema } = require('./schema')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost/auth')


app.post('/sign-up',async(req,res)=>{
const {email,name,mobile,password}=req.body;
try{
  const user= await Schema.create({email,name,mobile,password})
  console.log(user)
  res.send(user)
}
catch(err){
       res.send(err.message)
   }
});
app.post('/login',async (req,res,next) => {
  Schema.find({email : req.body.email})
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
app.listen(2050,()=>console.log ('server running at port 2050'))