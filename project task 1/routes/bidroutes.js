const express=require('express');
const router = express.Router();
const verify=require('../middleware/tokenverify')
const bid = require('../controllers/bid');


router.post('/auction',bid.auction)
router.post('/biding',bid.biding)
router.patch('/buy/',bid.buy)
router.post('/transfer',bid.transfer)


module.exports=router