const crypto = require('crypto');  
const secret = 'secret password';  
const hash = crypto.createHmac('sha256', secret)  
                   .update('Welcome to practice')  
                   .digest('hex');  
console.log(hash);  