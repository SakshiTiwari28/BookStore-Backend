var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "xn36f66z87znnsqq",
  publicKey: "ftz7v7fg9tt2w943",
  privateKey: "0cefed09d6827c3ffa94600387e93523"
});

exports.getToken = (req,res) => {

    gateway.clientToken.generate({
      }, function (err, response) {
        if(err){
            return res.status(500).send(err)
        }
        else{
            res.send(response)
        }
      });
}

exports.processPayment = (req,res) => {
let nonceFromTheClient = req.body.paymentMethodNonce
let amountFromClient = req.body.amount 

    gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromTheClient,
   
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(error){
          res.status(500).send(err)
          }
          else{
              res.send(result)
          }
      });

}