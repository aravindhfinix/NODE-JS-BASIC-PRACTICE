const express=require('express');
const router=express.Router();
router.use(express.json());
const users=[
    {id:1 ,person:'hari'},
    {id:2 ,person:'bala'},
    {id:3 ,person:'mohan'},
]


router.get('/',(req,res)=>{
    res.send(users);
    });
    //post meth
    router.post('/',(req,res)=>{
        const user={
            id:users.length+1,
            person:req.body.person
        };
        users.push(user);
        console.log(users);
    });
    //get by key param
    router.get('/:id',(req,res)=>{
        const user=users.find(h=>h.id===parseInt(req.params.id));
        if(!user)res.status(404).send('the requested user is not found!!!!!!!!1');
        res.send(user);
        });
       

       module.exports=router;
        
            