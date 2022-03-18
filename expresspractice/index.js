const express=require('express');
const app=express();
const bodyParse=require("body-parser");
const encoder=bodyParse.urlencoded({extended:false});


app.get('/',(req,res)=>{
res.send("hi friends")
});
    app.get('/function',(req,res)=>
    {res.sendFile(`${__dirname}/main.html`)})
    app.get('/function/:year/:month',(req,res)=>{
        res.send(req.params)
        });
        app.post('/function/name',encoder,(req,res)=>{
            res.send(req.body);
            });         
  //importing find user via get      
const ownrouter=require("./myroute");
app.use('/users',ownrouter)

const port=process.env.PORT||3000
app.listen(port,()=>console.log(`start the server at ${port}`));
