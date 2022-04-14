const express=require('express');
const router = express.Router();
const  movie = require ('../controllers/movies')


router.post('/create',movie.create)
router.post('/update',movie.update)


module.exports=router