exports.stripeErrorHandling = (err) => {
    let errorMessage = "";
    switch (err.type) {
        case "StripeCardError":
            // A declined card error
            errorMessage = err.message;
            break;
        case "StripeRateLimitError":
            // Too many requests made to the API too quickly
            errorMessage = err.message;
            break;
        case "StripeInvalidRequestError":
            // Invalid parameters were supplied to Stripe's API
            errorMessage = err.message;
            break;
        case "StripeAPIError":
            // An error occurred internally with Stripe's API
            errorMessage = err.message;
            break;
        case "StripeConnectionError":
            // Some kind of error occurred during the HTTPS communication
            errorMessage = err.message;
            break;
        case "StripeAuthenticationError":
            // You probably used an incorrect API key
            errorMessage = err.message;
            break;
        default:
            // Handle any other types of unexpected errors
            errorMessage = err.message;
            break;
    }
    return errorMessage
};