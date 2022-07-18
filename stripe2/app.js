const express = require('express')
const stripe = require('stripe')('sk_test_51KLK4wSFtjTqzTh0RzoZhtOIxhwAN1ylE1jq9rpZoEpdxFDXQplN6tuwPMkZysUBxaatWijIFcnHDBDYuVYHHc8800nS8BbAn0')


const app = express()
app.use(express.json());


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running onport ${PORT}`)
} )

app.post('/create/customer', (req, res)=>{
    var param = {}
    param.email = req.body.email,
    param.name = req.body.name,
    param.description = req.body.description
console.log(req.body.email)

    stripe.customers.create(param, function(err, customer){
        if(err){
            res.send("err:"+err)
            console.log("err:"+err )
        }
        if(customer){
            res.send("success:"+customer)

            console.log("success:"+customer)
        } else{
            console.log("Something wrong")
        }

})
})

app.get('/view/customer', (req, res)=>{
    stripe.customers.retrieve("cus_KjUlwK0FFeV4SY", function(err, customer){
        if(err){
            console.log("err:"+err )
            res.send("err:"+err)
        }
        if(customer){
            console.log("success:"+JSON.stringify(customer, null, 2))
            res.send("success:"+JSON.stringify(customer, null, 2))

        } else{
            console.log("Something wrong")
        }
    })

})

app.post('/create/token', (req, res)=>{
    var param = {}
    param.card = {
        // number: '4242 4242 4242 4242',
        number: '4111111111111111',
        exp_month: 04,
        exp_year: 2023,
        cvc: '045'
    }


    stripe.tokens.create(param, function(err, token){
        if(err){
            console.log("err:"+err )
            res.send("err:"+err)
        }
        if(token){
            console.log("success:"+JSON.stringify(token, null, 2))
            res.send("success:"+JSON.stringify(token, null, 2))
        } else{
            console.log("Something wrong")
        }
    })  

})

app.post('/create/card', (req, res)=>{
    stripe.customers.createSource("cus_KjrFEFw1jPPvk0",{source: "tok_1K4OScSBKm7ds0NryHnVVlX2"}, function(err, card){
        if(err){
            console.log("err:"+err )
            res.send("err:"+err )
        }
        if(card){
            console.log("success:"+JSON.stringify(card, null, 2))
            res.send("success:"+JSON.stringify(card, null, 2))
        } else{
            console.log("Something wrong")
        }
    })
})
app.post('/card/charge', (req, res)=>{
    var param = {
        amount: '2000',
        currency: 'inr',
        description: 'First payment',
        customer: 'cus_KjrFEFw1jPPvk0',
    }
    stripe.charges.create(param, function(err, charge){
        if(err){
            console.log("err:"+err )
            res.send("err:"+err)
        }
        if(charge){
            console.log("success:"+JSON.stringify(charge, null, 2))
            res.send("success:"+JSON.stringify(charge, null, 2))
        } else{
            console.log("Something wrong")
        }
    })  
})
app.post('/token/charge', (req, res)=>{
    var param = {
        amount: '2000',
        currency: 'inr',
        description: 'First payment',
        source: 'tok_1K4I2NSBKm7ds0NrvdLpuh7T',
    }
    stripe.charges.create(param, function(err, charge){
        if(err){
            console.log("err:"+err )
            res.send( "err:"+err )
        }
        if(charge){
            console.log("success:"+JSON.stringify(charge, null, 2))
            res.send("success:"+JSON.stringify(charge, null, 2))
        } else{
            console.log("Something wrong")
        }
    })
})

app.get('/customers', (req, res)=>{
    stripe.customers.list( {limit: 2},function(err, customers){
        if(err){
            console.log("err:"+err )
            res.send("err:"+err )
        }
        if(customers){
            console.log("success:"+JSON.stringify(customers.data, null, 2))
            res.send("success:"+JSON.stringify(customers.data, null, 2))
        } else{
            console.log("Something wrong")
        }
    })  

})
app.get('/card/delete', (req, res)=>{
    
    stripe.customers.deleteSource(
        'cus_Kjr4pUMVD6oplM',
        'card_1K43RXSBKm7ds0NrA1Yk4ERj'
      );

})


