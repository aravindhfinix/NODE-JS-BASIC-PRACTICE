const express=require('express')
const userschema=require('../models/userschema')
const jwt=require('jsonwebtoken')

//SIGNUP A NEW USER
exports.signup=async(req,res)=>{
  await userschema.create(req.body)
        .then(result=>{
            console.log(result);
            res.send(result)
        })
        .catch(err=>{console.log(err.message)
        res.send(err.message)})}
  //LOGIN USER AND CREATE TOKEN
    exports.login=async(req,res,next) => {
        await userschema.find({walletaddress: req.body.walletaddress})
        .then(user => {
            if(user.length <1){
                return res.status(401).json({
                    message : 'Auth failed'
      
                });
                
            }
        
                    const token = jwt.sign({
                        walletaddress:user[0].walletaddress

                    },"secret key",
                    {
                        expiresIn : "1h"
                    });
                    
                    return res.status(200).json({
                        message : "Auth Successful",
                        token : token
                    })
                
        })  
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
      
        }); 
      };

//update user details
exports.update=async(req,res)=>{
    const id = req.params.id
    await userschema.findOneAndUpdate({_id:id},{$set:req.body} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}
//delete user
exports.delete=async(req,res)=>{
    const id = req.params.id
    await userschema.deleteOne({id:id} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})

}