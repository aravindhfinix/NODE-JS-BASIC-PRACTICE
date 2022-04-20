const express=require('express')
const app=express();
const seatschema=require('../models/seatschema')
const movieSchema=require('../models/movieschema');
const theaterschema = require('../models/theaterschema');
const req = require('express/lib/request');
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//creating seats
exports.create=async (reeq,res)=>{
    await seatschema.create({
        seatnumber:req.body.seatnumber,
        screen:req.body.screen,
        time:req.body.time,
        movie:await movieSchema.find({name:req.param.id}),
    })
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
};

//updating the seat status by owner
exports.update=async (reeq,res)=>{
    await seatschema.findByIdAndUpdate(req.param.id,{status:req.body})
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
};

//finding the total no of seats
exports.showseats=async (req,res)=>{
    await seatschema.find({movie:req.param.id})
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
};
//booking tickets
