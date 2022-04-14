const express=require('express');
const router= express.Router();
const theater=require('../controllers/theaters')


router.post('/create',theater.create)
router.put('/update/:id',theater.update)


module.exports=router