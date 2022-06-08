const verify=require('../middleware/tokenVerify')
const express=require('express');
const router = express.Router();
const  todo = require ('../controllers/todo')
const passport=require('passport')
require('../middleware/passport')(passport)
passport.authenticate('jwt',{session:false}),

router.post('/create', todo.create)
router.get('/taskList',todo.previous)
router.post('/update/:id',todo.update)
router.post('/delete/:id',todo.delete)
router.post('/comment/:id',todo.comment)
router.post('/mail',todo.mail)

module.exports=router