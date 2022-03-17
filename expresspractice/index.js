const express=require('express');
const app=express();

app.get('/',(req,res)=>{
res.send("hi friends")
});
app.get('/no1',(req,res)=>{
    res.send("hi friends")
    });
    
const ownrouter=require("./myroute")
app.use('/test',ownrouter)

app.listen(8080,()=>{console.log("start the server at 8080")});
