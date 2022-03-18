const express=require('express');
const router=express.Router();
const users=[
    {id:1 ,person:'hari'},
    {id:2 ,person:'bala'},
    {id:3 ,person:'mohan'},
]


router.get('/',(req,res)=>{
    res.send(users);
    });
    router.get('/:id',(req,res)=>{
        const user=users.find(c=>c.id===parseInt(req.params.id));
        if(!user)res.status(404).send('the requested user is not found!!!!!!!!1');
        res.send(user);
        });
       module.exports=router;
        
            