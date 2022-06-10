const express=require('express')
const app=express();
const mongoose=require('mongoose');
const chalk=require('chalk')
const chalkRainbow=require('chalk-rainbow')
const schema=require('./sche/schema')
app.use(express.json())
app.use(express.urlencoded({extended:true}))


mongoose.connect("mongodb://localhost/book")
if(1==2){console.log('hi')}
//users adding to db
app.post('/users/add',async(req,res)=>
{
const user=req.body;
await schema.create(user)
.then(results=>{console.log(results)

    res.send(results)
})
.catch(errors=>{res.sen(errors.message)})
})
//read users
app.get('/users/find',async(req,res)=>
{
    await schema.find()
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
})
//finid particular user by id
app.get('/user/search/:id',async(req,res)=>{
    const user=req.params.id
    await schema.findById(user)
    .then(results=>{res.send(results)})
    .catch(errors=>{console.log(chalk.red(errors.message))})
})
//update user details
app.patch('/users/update/:id',async(req,res)=>{
    const id = req.params.id
    await schema.findOneAndUpdate({id:id},{$set:req.body} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
})
//delete user
app.delete('/user/delete/:id',async(req,res)=>{
    const id = req.params.id
    await schema.deleteOne({id:id} )
    .exec()
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})

})

app.listen(5000,()=>{console.log(chalkRainbow('server started'))})

