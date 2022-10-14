const express = require('express');
const router = express.Router();
const stripeController = require('../controller/stripe-controller')

router.post('/create-customer', stripeController.createCustomer)
router.post('/charge-payment', stripeController.chargePayment)
router.post('/add-product', stripeController.addProduct)
router.post('/subscribe', stripeController.subscribe)

module.exports = router