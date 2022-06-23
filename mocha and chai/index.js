const express=require('express')
const app=express();
const mongoose=require('mongoose');
const chalk=require('chalk')
const chalkRainbow=require('chalk-rainbow')
const schema=require('./schema')
app.use(express.json())
app.use(express.urlencoded({extended:true}))


mongoose.connect("mongodb://localhost/testing",(error)=>{
   const status=mongoose.connection.readyState
   if(status===0){console.log("connection failed to db")}
   if(status===1){console.log("successfully connected to db")}
}) 

exports.isNumValid =(num)=>{
    if (num >= 70){
        return false
    } else if (num <10) {
        return false
    } else{
        return true
    }
}

//welcome route
app.get('/welcome',(req,res)=>{
 res.send("welcome")
})

//users adding to db
app.post('/users/add',async(req,res)=>
{
const user=req.body
await schema.create(user)
.then(results=>{console.log(results)

    res.send(results)
})
.catch(errors=>{res.send(errors.message)})
})


app.listen(5000,()=>{console.log(chalkRainbow('server started at 5000'))})

