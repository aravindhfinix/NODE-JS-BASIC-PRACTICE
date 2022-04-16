const express=require('express');
const router= express.Router();
const theater=require('../controllers/theaters')


router.post('/create',theater.create)
router.put('/update/:id',theater.update)
router.get('/find',theater.findmovies)

module.exports=router