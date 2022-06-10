const express=require('express');
const app=express();
const userRoutes=require('./routes/userroutes')
const todoRoutes=require('./routes/todoroutes')
const mongoose=require('mongoose')
require('dotenv').config()


mongoose.connect("mongodb://localhost/todo",()=>{
    const status=mongoose.connection.readyState
    if (status===0){console.log("connection failed to db")}
    if(status===1){console.log("successfully connected to db")}
}) 

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/',(req,res)=>{res.send('welcome to todo')})
app.use('/user', userRoutes)
app.use('/todo', todoRoutes)

app.use((req, res, next) => {
    const error =new Error("not found"); 
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



const port=process.env.PORT||3000
app.listen(port,()=>{console.log(`server running at port ${port}`)})