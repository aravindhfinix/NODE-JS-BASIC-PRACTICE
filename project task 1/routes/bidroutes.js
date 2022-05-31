const express=require('express');
const router = express.Router();
const verify=require('../middleware/tokenverify')
const bid = require('../controllers/bid');


router.post('/auction/:id',bid.auction)
router.patch('/biding/:id/:id1',bid.biding)


module.exports=router