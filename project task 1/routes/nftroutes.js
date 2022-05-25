const express=require('express');
const router = express.Router();
const  nft = require ('../controllers/nft')


router.post('/create',nft.create)
router.get('/get/:id',nft.get)
router.patch('/update/:id',nft.update)
router.post('/delete/:id',nft.delete)


module.exports=router