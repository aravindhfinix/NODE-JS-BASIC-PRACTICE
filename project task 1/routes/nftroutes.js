const express=require('express');
const router = express.Router();
const  nft = require ('../controllers/nft')
const multer=require('multer')


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"../uploads");
    },
    filename: function(req,file,cb){
        cb(null,new Date()+ '--' + file.originalname)
    }
});

const upload = multer({storage:storage});  


router.post('/create',upload.single('nftimage'),nft.create)
router.get('/get/:id',nft.get)
router.patch('/update/:id',nft.update)
router.post('/delete/:id',nft.delete)


module.exports=router