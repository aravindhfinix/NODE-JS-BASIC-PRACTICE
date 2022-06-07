const verify=require('../middleware/tokenverify')
const express=require('express');
const router = express.Router();
const  todo = require ('../controllers/v1.0.0/todo')
const passport=require('passport')
require('../middleware/passport')(passport)


router.post('/create', passport.authenticate('jwt',{session:false}),todo.create)
router.get('/previous',verify,todo.previous)
router.post('/update/:id',todo.update)
router.post('/delete/:id',todo.delete)
router.post('/comment/:id',todo.comment)
router.post('/mail',todo.mail)

module.exports=router