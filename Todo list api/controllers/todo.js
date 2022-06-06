const express=require('express')
const todoschema=require('../models/todoschema')
const userschema=require('../models/userschema')
const cron=require('node-cron')
const nodemailer=require('nodemailer')

//create task
exports.create=async(req,res)=>{
    const user=await userschema.findOne({name:req.body.username})
    await todoschema.create({
        username:user,
        taskname:req.body.taskname,
        taskdetailes:req.body.taskdetailes,
        tasktiming:req.body.tasktiming,
    })

.then(results=>{res.send(results)})
.catch(errors=>{res.send(errors.message)})}

//update task
exports.update=async(req,rea)=>{
    await todoschema.findByIdAndUpdate(req.params.id,{
        taskdetailes:req.body.taskdetailes,
        taskstatus:req.body.taskstatus,
        tasktiming:req.body.tasktiming})
    

.then(results=>{res.send(results)})
.catch(errors=>{res.send(errors.message)})} 

//delete task
exports.delete=async(req,res)=>{

    await todoschema.findByIdAndDelete(req.params.id)

    
.then(results=>{res.send(results)})
.catch(errors=>{res.send(errors.message)})
}

//comment task
exports.comment=async(req,res)=>{
    await todoschema.findByIdAndUpdate(req.params.id,{comment:req.body.comment})
    

.then(results=>{res.send(results)})
.catch(errors=>{res.send(errors.message)})} 

//see previous tasks
exports.previous=async(req,res)=>{
    await todoschema.find({tasktiming:req.body.tasktiming})
    
.then(results=>{res.send(results)})
.catch(errors=>{res.send(errors.message)})

}

//send mail for task status
exports.mail=async(req,res)=>{
   const list=await todoschema.find()
   const user=await userschema.findById(list.username)
   console.log(list)
   res.send(user)
   .then(result=>{
 
    //   cron.schedule('1-5 * * * *', () => {
var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'aravindhfinix.fsd@gmail.com',
pass: 'aravindh@IT1'
}
});
var mailOptions = {
from: 'aravindhfinix.fsd@gmail.com',
to:user.email,
subject: 'task ',
html: `pending task for${user.name} is ${list.status}</h1> `
};

transporter.sendMail(mailOptions, function(error, info){
if (error) {
console.log(error);
} 
else {
console.log('Email sent: ' + info.response);
res.send('Email sent: ' + info.response);
}
})
// })
} )
. catch(err=>{
   res.send(err.message)
}
)

}