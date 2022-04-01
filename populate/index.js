const express=require('express')
const app=express()
const mongoose=require('mongoose')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
 
mongoose.connect('mongodb://localhost/work')

const employeSchema=new mongoose.Schema({
    employe:{type:String},
    number:Number,
    email:String,
    department:{type:mongoose.Schema.Types.ObjectId,ref:'department'},
    company:{type:mongoose.Schema.Types.ObjectId,ref:'company'},
})
const employe=mongoose.model('employe',employeSchema)

const companyschema=new mongoose.Schema({
    name:{type:String},
    employe:[{type:mongoose.Schema.Types.ObjectId,ref:'employe'}]
})
const company=mongoose.model('company',companyschema)

const departmentSchema=new mongoose.Schema({
    name:{type:String},
    location:{type:String}
})
const department=mongoose.model('department',departmentSchema)

app.post('/employe',async(req,res)=>
{
await employe.create({
    employe:'aravindh',
    number:12345,
    email:'aravi@gmail.com',
    department:await department.findOne({name:'IT department'}),
    company:await company.findOne({name:'spark out'})

},
    {
        employe:'shiva',
        number:1234555,
        email:'shiva@gmail.com',
        department:await department.findOne({name:'IT department'}),
        company:await company.findOne({name:'spark out'})

    },
        {
            employe:'bala',
            number:123454455,
            email:'balda@gmail.com',
            department:await department.findOne({name:'marketing'}),
            company:await company.findOne({name:'spark out'})},
            {
                employe:'kavi',
                number:123455445,
                email:'kavia@gmail.com',
                department:await department.findOne({name:'marketing'}),
                company:await company.findOne({name:'spark out'})})
    
.then(results=>{console.log(results)

    res.send(results)
})
.catch(errors=>{
    res.send(errors.message)
})
});

app.post('/company',async(req,res)=>{
   await company.create({
       name:'spark out',
       employe:await employe.find()
   })
   .then(results=>{console.log(results)

    res.send(results)
})
.catch(errors=>{
    res.send(errors.message)
})
    })
    app.get('/findemp',async(req,res)=>{
        const reys= await employe.find().populate()
        
        console.log (reys)
        res.send(reys)})
    app.post('/department',async(req,res)=>{
        const user=await department.create(req.body)
        console.log(user)
        res.send(user)
        })
app.listen(3000,()=>console.log("server running"))