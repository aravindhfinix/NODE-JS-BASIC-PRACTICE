const mongoose=require('mongoose');
const express=require('express');
const path=require('path')
const app=express();
const todo=require('./models/todo');
const res = require('express/lib/response');
const { get } = require('express/lib/response');
const { errorMonitor } = require('events');
const req = require('express/lib/request');
const { findOneAndUpdate } = require('./models/todo');
app.use(express.json());
app.use(express.urlencoded({extended:"false"}));



app.use('/',express.static(path.resolve(__dirname,'mongodbpractice')))

mongoose.connect("mongodb://localhost/book");

//adding to db
app.post('/create',async(req,res)=>{
  const user=req.body
  console.log(user)
 
 const show= await todo.create(user)
 console.log(show)

 res.json({status:"added to DB"});
});


//getting form db
app.get('/read',async(req,res)=>{
    const records=await todo.find()
    res.json(records)
    console.log(records )
});

//updating a user in db
app.post('/update',async(req,res)=>
{
  const {old:oldTitle,new:newTitle}=req.body
   const response=await todo.findOneAndUpdate(
     {
     user:oldTitle
   },
   
   {$set:{
     user:newTitle
    }
   },
   {new:true})
   console.log(response)
   res.json('status ok')
});

//deleting a user in db
app.post('/delete',async(req,res)=>
{
  const{user}=req.body
  console.log(user,'/delete')
   const response=await todo.deleteOne( {user} )
   console.log(response,'/delete response')
   res.json('deleted')
});






//seaching particular user in db
app.get('/find',async(req,res)=>{
    const display=await todo.findOne({password:req.query.search})
    res.json(display)
     console.log(display)

});

//login in model
app.post('/login',async(req,res)=>{
    const usershow=await todo.findOne({user:req.body.user})
    const pwd=await todo.findOne({password:req.body.password})
     try {
      if(usershow.password===pwd.password){
        res.json(usershow)
         console.log(usershow)}
        else{
          res.send('invalid details')
      console.log('login failed')

        }}
      catch (error){
        res.send('login failed')
        console.log('login failed')
      
     }  
})
app.listen(8080,()=>{console.log('server is running')});