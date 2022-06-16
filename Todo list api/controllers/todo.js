const todoSchema=require('../models/todoschema')
const userSchema=require('../models/userschema')
const cron=require('node-cron')
const sendMail=require('../helpers/mail').sendMail
const dateToday=require('../helpers/date').todaysDate

//CREATING A TASK

exports.create=async(req,res)=>{

    await userSchema.findOne({name:req.body.userName})
  
.then(async results=>{
 
     const task=await todoSchema.create({
        userName:req.body.userName,
        userId:results,
        taskName:req.body.taskName,
        taskNetailes:req.body.taskDetailes,
        taskDue:req.body.taskDue,
        taskCreatedAt:dateToday
    })

    res.json({
           status:'task created',
           task:task})
        })
.catch(errors=>{res.send(errors.message)})}

//UPDATING A TASK

exports.update=async(req,res)=>{
    const date=new Date()
        const todaysTime=date.toLocaleTimeString()

    await todoSchema.findByIdAndUpdate(req.params.id,{   //updating the following feilds with updated time and date
        taskDetailes:req.body.taskDetailes,
         status:req.body.status,
        taskDue:req.body.taskTiming,
        taskUpdatedAt:{
            date:dateToday,
            time:todaysTime
        }
    })
    
.then(results=>{
if(!results){
    res.status(404).send('not found')
}else{
    res.json({
        status:'task updated',
        updatedAt:[results.taskUpdatedAt]
    
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
 
  if(req.body.taskCreatedAt===undefined)   //default todays tasks
   {
    await todoSchema.find({taskCreatedAt:dateToday}) 
    
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
        await todoSchema.find({taskCreatedAt:req.body.taskCreatedAt,status:false})
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
    await todoSchema.find({taskCreatedAt:req.body.taskCreatedAt})  //requested day tasks
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
    {$match:{taskCreatedAt:dateToday}},
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

    cron.schedule('00 00 */23 * * *',()=>{            //sheduled for every 23 hrs from started time
  
        for(var i in result){
            const name=result[i].uemail.name
            const status=result[i].status
            const email=result[i].uemail.email

            sendMail(email,name,status)              //invoking mail function
            console.log(email)
            }
            res.send('EOD status sent')
      })
        } )
        . catch(err=>{
           res.send(err.message)
        }
        )
} 