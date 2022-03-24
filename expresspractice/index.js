const express=require('express');
const Joi=require('joi')
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const alert=require('alert')


app.get('/',(req,res)=>{
res.send("hi friends")
});
    app.get('/function',(req,res)=>
    {res.sendFile(`${__dirname}/main.html`)})
    app.get('/function/:year/:month',(req,res)=>{
        res.send(req.params)
        });
 //post methord form and middleware with validation
        app.post('/function/name',(req,res)=>{ 
            const schema={
                name: Joi.string().alphanum().min(3).max(30).required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

            };
            const result=Joi.validate(req.body,schema);
                console.log(result);
            if(result.error){
            res.status(400).send("please enter a valid name or email");
            return;}
        
            res.send(req.body);
            });         
  //importing find user via get      
const ownrouter=require("./myroute");
app.use('/users',ownrouter)

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`start the server at ${port}...`));
