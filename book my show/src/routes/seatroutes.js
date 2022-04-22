const express=require('express');
const router= express.Router();
const seats=require('../controllers/seats')
const verify=require('../middle ware/veify token')
const payment=require('../middle ware/payment verify')

router.post('/create',seats.create)
router.patch('/update',seats.update)
router.get('/showallseats/:id',seats.showallseats)
router.get('/selectingseats/:id',seats.selectingseats)
router.patch('/booked',verify,payment,seats.reset)
module.exports=router
