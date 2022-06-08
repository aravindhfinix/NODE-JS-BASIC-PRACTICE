const nodeMailer=require('nodemailer');
const userSchema=require('../../models/userschema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//SIGNUP A NEW USER AND SEND OTP
exports.signUp=async(req,res)=>{

  var otp=Math.random()
    otp=otp*10000
    otp=parseInt(otp)
      if(req.body.password===req.body.confirmPassword)          //comparing password and confirm password and creating the user
      {
          await bcrypt.hash(req.body.password,10,(error,hash)=>{
           userSchema.create({
              name:req.body.name,
              email:req.body.email,
              password:hash,
              confirmPassword:hash,
              otp:otp
               } )
      .then(result=>{
               console.log(result);
               res.json({
                 status:'created',
                 user:result
               })
                 var transporter = nodeMailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.EM_PASS
                    }
                  });
                  
                  var mailOptions = {                       //sending otp for users email
                    from: process.env.EMAIL,
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
  exports.otpVerify=async(req,res)=>{

    await userSchema.findOne({email:req.body.email})
  
    .then(async results=>{
      if(req.body.otp=results.otp)                 //have to verify the otp to login
     {
      await userSchema.findOneAndUpdate({email:req.body.email},{$unset:{otp:req.body.otp}})
 
        res.status(201).send('signup success')
      }
      else
      {
        res.status(500).send("invalid otp")
      }
    })
    .catch(errors=>{res.send(errors.message)})
  }
  //LOGIN USER AND CREATE TOKEN ONLY AFTER OTP VERIFICATION
  exports.login=async(req,res,next) => {
    
    await userSchema.findOne({email:req.body.email})
    .then(user => {
        if(user.otp===undefined){                      //if the otp is verified user is loggedin
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
  
        })}
        else{                                       //if otp verification is not done
          res.send('otp verification not done')
        };   
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
    await userSchema.findOneAndUpdate({_id:id},{$set:req.body} )
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
    await userSchema.deleteOne({_id:id} )
    .then(results=>{
      if(!results)
      {
      res.status(404).send('not found')
      }
      else
      {
      res.send('deleted succesfully')
      }
    })
    .catch(errors=>{res.send(errors.message)})
}