const crypto = require('crypto');  
const decipher = crypto.createDecipheriv('aes192', 'a password');  
var encrypted = '';  
var decrypted = decipher.update(encrypted, 'hex', 'utf8');  
decrypted += decipher.final('utf8');  
console.log(decrypted); 