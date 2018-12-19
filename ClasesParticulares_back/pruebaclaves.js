// var SHA256 = require("crypto-js/sha256");

// let clave1 = SHA256("laputaclave123").toString();

// let clave2 =SHA256("laputaclave123").toString();

// console.log(clave1)
// if(clave1 === clave2)
// console.log('Son puto iguales')
// else
// console.log('son diferentes')

require('crypto').randomBytes(12, function(err, buffer) {
  var token = buffer.toString('hex');
  console.log(token)
});

