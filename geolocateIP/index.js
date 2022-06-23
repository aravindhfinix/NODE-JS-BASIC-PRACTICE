var geoip = require('geoip-lite');

var ip = "203.223.190.34";
var geo = geoip.lookup(ip);

console.log(geo);
