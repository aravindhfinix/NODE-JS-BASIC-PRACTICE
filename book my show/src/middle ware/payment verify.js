module.exports = (req,res,next) =>{
    try{
      const  payment="paid"
        if(payment==="paid")
        next();  
    }
    catch (error){
        
        return res.status(404).json({
            message : "payment failed"
        });
    }
    
    
}