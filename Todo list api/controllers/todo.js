const todoSchema=require('../models/todoschema')
const userSchema=require('../models/userschema')
const cron=require('node-cron')
const nodeMailer=require('nodemailer')


//CREATING A TASK

exports.create=async(req,res)=>{

    await userSchema.findOne({name:req.body.userName})
  
.then(async results=>{
    const date=new Date()
    const todaysDate=date.toLocaleDateString()
     const task=await todoSchema.create({
        userName:req.body.userName,
        userId:results,
        taskName:req.body.taskName,
        taskNetailes:req.body.taskDetailes,
        taskDue:req.body.taskDue,
        taskCreatedAt:todaysDate
    })

    res.json({
           status:'task created',
           task:task})
        })
.catch(errors=>{res.send(errors.message)})}

//UPDATING A TASK

exports.update=async(req,res)=>{
    const date=new Date()
    const todaysDate=date.toLocaleDateString()
    const todaystime=date.toLocaleTimeString()

    await todoSchema.findByIdAndUpdate(req.params.id,{   //updating the following feilds with updated time and date
        taskDetailes:req.body.taskDetailes,
        status:req.body.status,
        taskDue:req.body.taskTiming,
        taskUpdatedAt:{
            date:todaysDate,
            time:todaystime
        }
    })
    
.then(results=>{
if(!results){
    res.status(404).send('not found')
}else{
    res.json({
        status:'task updated',
        updatedAt:results.taskUpdatedAt
    
    })
}
})
.catch(errors=>{res.send(errors.message)})} 

//DELETING A TASK
exports.delete=async(req,res)=>{

await todoSchema.deleteOne(req.params.id)

.then(results=>{
if(!results){
    res.status(404).send('not found')
}
else{
    res.send('sucessfully deleted')
}
})
.catch(errors=>{res.send(errors.message)})
}

//ADD COMMENT TO OUR TASK

exports.comment=async(req,res)=>{
    
await todoSchema.findByIdAndUpdate(req.params.id,{comment:req.body.comment})
    
.then(results=>{
if(!results)
{
    res.status(404).send('not found')
}
else
{
    res.json({
        status:'comment added',
        commentMade:req.body.comment})
}
})
.catch(errors=>{res.send(errors.message)})
} 

//SEE TODAYS TASKS OR REQUIRED TASK BY STATUS

exports.previous=async(req,res)=>{
    const date=new Date()
    const todaysDate=date.toLocaleDateString()
    

  if(req.body.taskCreatedAt===undefined)   //default todays tasks
   {
    await todoSchema.find({taskCreatedAt:todaysDate}) 
    
    .then(results=>{
    if(!results)
    {
        res.status(404).send('not found')
    }
    else
    {
        res.json({
            results:'found todays tasks',
            TodaysTasks:results
        })
    }
    })
    .catch(errors=>{res.send(errors.message)})
  }
  else
  {
     if(req.body.status===false)  //requested day pending tasks
     {
        await todoSchema.find({taskCreatedAt:req.body.taskCreatedAt,status:false,userName:req.body.userName})
        .then(results=>{
            if(!results)
            {
                res.status(404).send('not found')
            }
            else
            {
                res.json({
                    results:'found requested day pending tasks',
                    previousTasks:results
                })
            }
            })
            .catch(errors=>{res.send(errors.message)})
     }
else{
    await todoSchema.find({taskCreatedAt:req.body.taskCreatedAt,userName:req.body.userName})  //requested day tasks
    .then(results=>{
    if(!results)
    {
        res.status(404).send('not found')
    }
    else
    {
        res.json({
            results:'found requested day tasks',
            previousTasks:results
        })
    }
    })
    .catch(errors=>{res.send(errors.message)})
  }
}
}

//EOD TASK STATUS EMAIL

exports.mail=async(req,res)=>{
    
await todoSchema.aggregate([
    {
    $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "uemail"
    }}, 
{$unwind: "$uemail"}
])

.then(result=>{
    
    cron.schedule('00 00 */24 * * *',()=>{            //sheduled for every 24 hrs from started time
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL,
        pass: process.env.EM_PASS
        }
        })
        for(var i in result){
         
            if(result[i].status===false){            //EOD message for pending task
              
               var mailOptions = {
               from: process.env.EMAIL,
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
        else{                                       //EOD message for completed task

            var mailOptions = {
                from: process.env.EMAIL,
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
      
        
      })
        } )
        . catch(err=>{
           res.send(err.message)
        }
        )
}