const express=require('express');
const app=express();
const userRoutes=require('./routes/userroutes')
const todoRoutes=require('./routes/todoroutes')
const mongoose=require('mongoose')
app.use(express.urlencoded({extended: false}));
app.use(express.json());
require('dotenv').config()


mongoose.connect("mongodb://localhost/todo",()=>{
    const status=mongoose.connection.readyState
    if (status===0){console.log("connection failed to db")}
    if(status===1){console.log("successfully connected to db")}
}) 

//MAIN ROUTES

app.get('/',(req,res)=>{res.send('welcome to todo')})
app.use('/user', userRoutes)
app.use('/todo', todoRoutes)

//404 ERROR IF REQUESTED URL
app.use((req, res, next) => {
    res.status(404).json({error:"requested page not found"})
});



const port=process.env.PORT||3000
app.listen(port,()=>{console.log(`server running at port ${port}`)})