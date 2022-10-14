const { createPrice, createProduct, createSubscription, paymentIntent, paymentMethod, createCustomer, createCustomers } = require("../services/stripe-services");

//create customer
exports.createCustomer = async (req, res) => {
    try {
        const customer = await createCustomers(req.body)
        res.status(200).json({
            status: true,
            message: "customer created",
            data: customer
        })
    } catch (exception) {
        console.log(exception)
    }

}

//create product for customer
exports.chargePayment = async (req, res) => {
    const customer = await createCustomers(req.body)
    const paymentMeth = await paymentMethod()
    const payment = await paymentIntent(customer.id, paymentMeth.id)
    console.log(payment)
    res.status(200).json({
        status: true,
        message: "payment charged",
        data: payment
    })
}

//create product for customer
exports.addProduct = async (req, res) => {
    let product = await createProduct(req.body, res);
    let price = await createPrice(req.body, product, res);
    res.status(200).json({
        status: true,
        message: "product created",
        product: product,
        price: price
    })
}

//subscribe customer to product
exports.subscribe = async (req, res) => {
    let paymentMeth = await paymentMethod()
    let customer = await createCustomers(req.body,paymentMeth.id, res);
    let subscription = await createSubscription(req.body, paymentMeth, customer, res).catch((err)=>{console.log(err)})
    res.status(200).json({
        status: true,
        message: "subscription created",
        data: subscription
    })
}


