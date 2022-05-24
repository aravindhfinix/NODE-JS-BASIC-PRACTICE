const express=require('express')
const app=express()
const passport=require('passport')
const localstrategy=require('passport-local').Strategy;

passport.use(new localstrategy.Strategy({
    
},async()=>{}))
app.use(passport.initialize())
app.get('/',(req,res)=>{
    console.log('hello')
    res.send("hello")
})
const port=3000
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})