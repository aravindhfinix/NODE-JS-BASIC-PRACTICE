const mongoose=require('mongoose');
const express=require('express');
const app=express();
const userRoutes=require('./routes/userrouts')
mongoose.connect("mongodb://localhost/booking")


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/', userRoutes)
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




app.listen(5000,()=>{console.log('server started')})