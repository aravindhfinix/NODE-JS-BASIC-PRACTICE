const nodeMailer=require('nodemailer');
const userSchema=require('../../models/userschema')
const jwt=require('jsonwebtoken');


  //LOGIN USER AND CREATE TOKEN
  exports.login=async(req,res,next) => {
    var otp=Math.random()
    otp=otp*10000
    otp=parseInt(otp)
    await userSchema.findOneAndUpdate({email:req.body.email},{otp:otp})//loging in with email only
    .then(user => {
     
            if(user)                                                   //if user sending otp to user email
            { 
              var transporter = nodeMailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.EMAIL,
                pass: process.env.EM_PASS
              }
            });
            
            var mailOptions = {
              from: process.env.EMAIL,
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
 
//OTP VERIFY AND LOGIN

exports.otpLogin=async(req,res)=>{
 
  await userSchema.findOne({email:req.body.email})
  .then(async result=>{
  if(result.otp===req.body.otp)                                    
  {
   await userSchema.findOneAndUpdate({email:req.body.email},{$unset:{otp:req.body.otp}})
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