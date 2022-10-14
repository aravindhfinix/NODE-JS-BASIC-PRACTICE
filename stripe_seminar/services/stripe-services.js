const { stripeErrorHandling } = require("../helpers/helper");
const stripe = require('stripe')('sk_test_51LshdbFYrNDkvO6XqNbCHVZCM2QoZnn5JSTEdsilvGqpeLhejub71FHGvrItGD9vzov3aiMuuwSVEsEDZASwUqC700rCV1jbFm')

exports.createProduct = ({ product_name, product_description }, res) => {
    return new Promise((resolve, reject) => {
        stripe.products.create(
            {
                name: product_name,
                description: product_description,
            },
            (err, response) => {
                if (err) stripeErrorHandling(err, res);
                else resolve(response);
            }
        );
    });
};

exports.createPrice = (
    { currency, price, interval, interval_count },
    { id },
    res
) => {
    return new Promise((resolve, reject) => {
        stripe.prices.create(
            {
                unit_amount: price * 100,
                currency: currency,
                recurring: {
                    interval: interval,
                    interval_count: interval_count,
                },
                product: id,
            },
            (err, response) => {
                if (err) stripeErrorHandling(err, res);
                else resolve(response);
            }
        );
    });
};


exports.createCustomers = (data,methord) => {
    return new Promise((resolve, reject) => {
        console.log(data.name)
        stripe.customers.create(
            {
                email: data.email,
                name: data.name,
                address: {
                    postal_code: "default"
                },
                payment_method:methord
            },
            (err, response) => {
                if (err) stripeErrorHandling(err);
                else {
                    resolve(response);
                }
            }
        );
    });
};


exports.createSubscription = (
    { price, trial_period_days },
    card,
    { id },
    res
) => {
    return new Promise((resolve, reject) => {
        let params = {
            customer: id,
            items: [{ price: price }],
            trial_period_days: trial_period_days,
            off_session: true,
            payment_settings: {
                payment_method_types: ['card'],
            },
            collection_method: "charge_automatically",
            payment_behavior: "allow_incomplete",
            default_payment_method: card.id
        };
        stripe.subscriptions.create(params, (err, response) => {
            if (err) stripeErrorHandling(err, res);
            else resolve(response);
        });
    });
};


exports.paymentIntent = async (customer, card) => {

    const payInt = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'usd',
        payment_method_types: ['card'],
        customer: customer.id,
        setup_future_usage: "off_session",
        payment_method: card,
        confirm: true
    });

    return payInt
}

//4000003560000008
exports.paymentMethod = async (customer, card) => {
    const payMeth = await stripe.paymentMethods.create({
        type: 'card',
        card: {
            number: '4242424242424242',
            exp_month: 10,
            exp_year: 2023,
            cvc: '314',
        },
    })
    return payMeth
}