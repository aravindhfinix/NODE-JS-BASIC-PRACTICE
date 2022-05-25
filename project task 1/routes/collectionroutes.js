const express=require('express');
const router = express.Router();
const verify=require('../middleware/tokenverify')
const collection = require('../controllers/collection');


router.post('/create',verify,collection.create)
router.post('/get',collection.get)
router.patch('/update/:id',collection.update)
router.post('/delete/:id',collection.delete)


module.exports=router