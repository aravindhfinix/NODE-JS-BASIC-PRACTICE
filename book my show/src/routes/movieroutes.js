const express=require('express');
const verify=require('../middle ware/veify token')
const router = express.Router();
const  movie = require ('../controllers/movies')

router.get('/',movie.home)
router.get('/:id',movie.find)
router.post('/create',movie.create)
router.put('/update/:id',movie.update)


module.exports=router