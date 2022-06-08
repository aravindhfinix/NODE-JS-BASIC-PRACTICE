const todoschema=require('../../models/todoschema')
const userschema=require('../../models/userschema')
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
exports.update=async(req,res)=>{
    await todoschema.findByIdAndUpdate(req.params.id,{
        taskdetailes:req.body.taskdetailes,
        status:req.body.status,
        tasktiming:req.body.tasktiming})
    

.then(results=>{
if(!results){
    res.status(404).send('not found')
}else{
    res.send(results)
}
})
.catch(errors=>{res.send(errors.message)})} 

//delete task
exports.delete=async(req,res)=>{

await todoschema.findByIdAndDelete(req.params.id)

.then(results=>{
if(!results){
    res.status(404).send('not found')
}
else{
    res.send(results)
}
})
.catch(errors=>{res.send(errors.message)})
}

//comment task
exports.comment=async(req,res)=>{
    
await todoschema.findByIdAndUpdate(req.params.id,{comment:req.body.comment})
    
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

//see previous tasks
exports.previous=async(req,res)=>{
    
await todoschema.find({tasktiming:req.body.tasktiming})
    
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

//send mail for task status
exports.mail=async(req,res)=>{
todoschema.aggregate([
    {
    $lookup: {
        from: "users",
        localField: "username",
        foreignField: "_id",
        as: "uemail"
    }}, 
{$unwind: "$uemail"}
])

.then(result=>{
    // setInterval(()=>{
    // cron.schedule('0 0 18 * * *',()=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'aravindhfinix.fsd@gmail.com',
        pass: process.env.EM_PASS
        }
        })
        for(var i in result){
         
            if(result[i].status===false){
              
        var mailOptions = {
        from: 'aravindhfinix.fsd@gmail.com',
        to:result[i].uemail.email,
        subject: 'task ',
        html: `pending task for${result[i].uemail.name} is not completed try to complete it as soon as possible</h1> `
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } 
            else {
            console.log('Email sent: ' + info.response);
           res.send('EOD status sent ')
            }
            })}
        else{

            var mailOptions = {
                from: 'aravindhfinix.fsd@gmail.com',
                to:result=[i].uemail.email,
                subject: 'task ',
                html: `your task for${result[i].uemail.name} is completed well done</h1> `

        }
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } 
            else {
            console.log('Email sent: ' + info.response);
            res.send('EOD STATUS SENT')
               
            }
            })
    
    }}
      
        
    //  })
        } )
        . catch(err=>{
           res.send(err.message)
        }
        )
}