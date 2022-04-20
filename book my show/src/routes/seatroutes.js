const express=require('express');
const router= express.Router();
const seats=require('../controllers/seats')


router.post('/create',seats.create)