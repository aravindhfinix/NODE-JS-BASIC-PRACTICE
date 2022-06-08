const nodemailer=require('nodemailer');
const userschema=require('../../models/userschema')
const jwt=require('jsonwebtoken');


  //LOGIN USER AND CREATE TOKEN
  exports.login=async(req,res,next) => {
    var otp=Math.random()
    otp=otp*10000
    otp=parseInt(otp)
    await userschema.findOneAndUpdate({email:req.body.email},{otp:otp})
    .then(user => {
     
            if(user)
            { 
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
              subject: 'otp for login',
              html: `your otp for login is ${otp} `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) 
              {
                console.log(error);
              } else
               {
                console.log('Email sent: ' + info.response);
                res.send('otp sent');
              }
            })
         
            }
           })  
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
  
    });
  
  
  }; 
 
//otp verify

exports.otplogin=async(req,res)=>{
 
  await userschema.findOne({email:req.body.email})
  .then(result=>{
  if(result.otp===req.body.otp)
  {
userschema.findOneAndUpdate({email:req.body.email},{$unset:{otp:req.body.otp}})
const token = jwt.sign({
  email:result.email
},process.env.SECRET_KEY,
{
  algorithm : "HS256",
  expiresIn : "1h"
});
return res.status(200).json({
  message : "Auth Successful",
  token : token
})
}
else
{
res.send('wrong otp try again')
}
})
}