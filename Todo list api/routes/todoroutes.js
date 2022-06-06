const verify=require('../middleware/tokenverify')
const express=require('express');
const router = express.Router();
const  todo = require ('../controllers/todo')


router.post('/create',todo.create)
router.get('/previous',todo.previous)
router.post('/update/:id',todo.update)
router.post('/delete/:id',todo.delete)
router.post('/comment/:id',todo.comment)
router.post('/mail',todo.mail)

module.exports=router