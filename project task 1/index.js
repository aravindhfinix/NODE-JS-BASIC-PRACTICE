const mongoose=require('mongoose');
const express=require('express');
const app=express();
const userRoutes=require('./routes/userroutes')
const nftRoutes=require('./routes/nftroutes')
const collectionRoutes=require('./routes/collectionroutes')
mongoose.connect("mongodb://localhost/nft")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('welcome')
});
app.use('/user', userRoutes)
app.use('/nft', nftRoutes)
app.use('/collection', collectionRoutes)

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



const port=process.ENV||4000
app.listen(port,()=>{console.log(`server started ${port}`)})