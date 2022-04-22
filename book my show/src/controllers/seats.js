const express=require('express')
const app=express();
const seatschema=require('../models/seatschema')
const movieSchema=require('../models/movieschema');
const jwt=require('jsonwebtoken')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//creating seats
exports.create=async (req,res)=>{
    await seatschema.create({
        seatnumber:req.body.seatnumber,
        status:req.body.status,
        screen:req.body.screen,
        time:req.body.time,
        movie:await movieSchema.findOne({name:req.body.movie}),
    })
    .then(results=>{res.send(results)
    console.log(results)})
    .catch(errors=>{res.send(errors.message)})
};

//updating the seat status by owner
exports.update=async (reeq,res)=>{
    await seatschema.findByIdAndUpdate(req.params.id,{status:req.body})
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
};

//finding the total no of seats
exports.showallseats=async (req,res)=>{
    await seatschema.find({movie:req.params.id},{time:req.body.time})
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
};
//booking tickets
exports.selectingseats=async(req,res)=>{
   const seat= await seatschema.findById(req.params.id)
   if(seat.status==="free"){
      res.send(seat)
   }
   else{
       res.send('seat booked')
   }
};
//ticket booked
exports.tickets=async(req,res)=>{
    await seatschema.findByIdAndUpdate(req.params.id,{status:"booked"})
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,'secret key')
    .then(results=>{res.send(results)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'aravindhfinix.fsd@gmail.com',
              pass: 'aravindh@IT1'
            }
          });
          
          var mailOptions = {
            from: 'aravindhfnix@.fsd@gmail.com',
            to:decoded.email,
            subject: 'otp for registration',
            html: `messing sending to host<h1>the otp for${req.body.name} is ${otp}</h1> `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })}
    )
    .catch(errors=>{res.send(errors.message)})

};
//reset all tickets to free an change timings
exports.reset=async(req,res)=>{
    await seatschema.updateMany({status:"free"})
}