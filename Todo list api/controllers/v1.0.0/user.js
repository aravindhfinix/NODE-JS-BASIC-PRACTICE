const nodemailer=require('nodemailer');
const userschema=require('../../models/userschema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()

//SIGNUP A NEW USER AND SEND OTP
exports.signup=async(req,res)=>{

  var otp=Math.random()
    otp=otp*10000
    otp=parseInt(otp)
      if(req.bodypassword===req.body.confirmpassword)
      {
          await bcrypt.hash(req.body.password,10,(error,hash)=>{
           userschema.create({
              name:req.body.name,
              email:req.body.email,
              password:hash,
              confirmpassword:hash,
              otp:otp
               } )
      .then(result=>{
               console.log(result);
               res.send(result)
                 var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'aravindhfinix.fsd@gmail.com',
                      pass: process.env.EM_PASS
                    }
                  });
                  
                  var mailOptions = {
                    from: 'aravindhfinix.fsd@gmail.com',
                    to:req.body.email,
                    subject: 'otp for registration',
                    html: `messing sending to host<h1>the otp for${req.body.name} is ${otp}</h1> `
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                      res.send('Email sent: ' + info.response);
                    }
                  })
              })
        .catch(err=>{console.log(err.message)
              res.send(err.message)})
      })
      }
      else
      {
        res.send('password not matched')
      }

  }
  
  
//VERIFY OTP PAGE
  exports.otpverify=async(req,res)=>{

   const otp= await userschema.findOne({email:req.body.email})
      if(req.body.otp==otp.otp)
     {
        userschema.findOneAndUpdate({email:req.body.email},{$unset:{otp:req.body.otp}})
        res.status(201).send('signup success')
      }
      else
      {
        res.status(500).send("invalid otp")
      }

  }
  //LOGIN USER AND CREATE TOKEN
  exports.login=async(req,res,next) => {
    
    await userschema.findOne({email : req.body.email})
    .then(user => {
        if(user.length <1){
            return res.status(401).json({
                message : 'Auth failed'
  
            });
            
        }
        bcrypt.compare(req.body.password,user.password,(err,result) =>{
            
            if(result)
            {
               const token = jwt.sign({
                    email:user.email,
                    userId : user._id
                },process.env.SECRET_KEY,
                {
                    expiresIn : "1h"
                });
                return res.send(`bearer ${token}`)
            }
            res.status(401).json({
                message :'password invalid'
            })
  
        });   
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
  
    });
  
  
  }; 
 
//update user details
exports.update=async(req,res)=>{
    const id = req.params.id
    await userschema.findOneAndUpdate({_id:id},{$set:req.body} )
    .then(results=>{
      if(!results)
      {
      res.status(404).send('not found')
      }
      else
      {
      res.send(results)
      }
})
    .catch(errors=>{res.send(errors.message)})
}
//delete user
exports.delete=async(req,res)=>{
    const id = req.params.id
    await userschema.deleteOne({_id:id} )
    .then(results=>{
      if(!results)
      {
      res.status(404).send('not found')
      }
      else
      {
      res.send(results)
      }
    })
    .catch(errors=>{res.send(errors.message)})
}