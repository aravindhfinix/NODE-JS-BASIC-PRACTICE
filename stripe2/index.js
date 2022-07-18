const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_BlD4SrbP60Qa94PrQ1pTHYtB')


const port = process.env.PORT || 3000;


app.listen(port, () =>{
    console.log(`Server running on ${port}`)
})

const createCustomer = () =>{
    var param ={}
    param.email = "kishor@gmail.com";
    param.name = "kishor";
    param.description = "testing";
    
    stripe.customers.create(param,(err,customer)=>{
        if(err)
        {
            console.log("err",err)
        }if(customer)
        {
            console.log("success",customer)
        }else{
            console.log("something wrong")
        }        

    })

}    
// createCustomer();
const retrieveCustomer = ()=>{
    stripe.customers.retrieve("cus_L1PPUnMdWOTGaP",(err,customer)=>{
        if(err)
        {
            console.log("err",err)
        }if(customer)
        {
            console.log("success",customer)
            // console.log("success :"+JSON.stringify(customer,null,2));
        }else{
            console.log("something wrong")
        }        

    })
}
// retrieveCustomer();

const createToken =()=>{
    const param ={};
    param.card={
        // number :'4242 4242 4242 4242',
        number: '4111111111111111',
        exp_month : 2,
        exp_year :2024,        
        cvc : '212'
    }
    stripe.tokens.create(param,(err,token)=>{
        if(err)
        {
            console.log("err",err)
        }if(token)
        {
            console.log("success",token)
            // console.log("success :"+JSON.stringify(customer,null,2));
        }else{
            console.log("something wrong")
        }        

    })
}
createToken();

const addCardToCustomer = ()=>{
    stripe.customers.createSource('cus_L1PPUnMdWOTGaP',{source:'tok_1KLMbXHTmreD1g4tRqnuWukQ'},(err,card)=>{
        if(err)
        {
            console.log("err",err)
        }if(card)
        {
            console.log("success",card)
            // console.log("success :"+JSON.stringify(customer,null,2));
        }else{
            console.log("something wrong")
        }        

    })
}
// addCardToCustomer();

/**charge customer through customer id */
const chargeCustomer =()=>{
    const param ={
        amount :'20000',
        currency : 'inr',
        description : 'first pay',
        customer : 'cus_L1PPUnMdWOTGaP',
        // source : 'card_1KLLUaSFtjTqzTh0hg5HbEuR'
    }
    stripe.charges.create(param,(err,charge)=>{
        if(err)
        {
            console.log("err",err)
        }if(charge)
        {
            // console.log("success",charge)
            console.log("success :"+JSON.stringify(charge,null,2));
        }else{
            console.log("something wrong")
        }        

    })
}
// chargeCustomer();


/**charge customer through token */
const chargeCustomerToken =()=>{
    const param ={
        amount :'6000',
        currency : 'usd',
        description : 'first pay',        
        source : 'tok_1KLN4PHTmreD1g4treNRChwc'
    }
    stripe.charges.create(param,(err,charge)=>{
        if(err)
        {
            console.log("err",err)
        }if(charge)
        {
            // console.log("success",charge)
            console.log("success :"+JSON.stringify(charge,null,2));
        }else{
            console.log("something wrong")
        }        

    })
}
// chargeCustomerToken();

const getAllCustomers =()=>{
    
    stripe.customers.list((err,customers)=>{
        if(err)
        {
            console.log("err",err)
        }if(customers)
        {
            // console.log("success",charge)
            console.log("success :"+JSON.stringify(customers,null,2));
        }else{
            console.log("something wrong")
        }        

    })
}
// getAllCustomers();