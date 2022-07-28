const router = require('express').Router();
let Payment = require('../models/payment');
const stripe = require("stripe")("sk_test_51LQUhSFrHNJyuz7GBJJOrNhKLYVgBkrJsv4nHTiyEE6CbsqrP5Ntg9kuGRoq8RJZSK1l5Ke0CWBUUChp2KE7mq9g00BdwXpg2D");

/*router.route('/add').post(async(req1,req2, res) =>{
    console.log("Add Payment");
    const renter_id = req1.body.renter_id;
    const amount = Number(req1.body.amount);
    const date = req1.body.date;
    let error;
    let status;

    console.log('renter_id:' + renter_id + " " +'amount:' + amount);

    try {
        const token = req2.body;
    
        const customer = await stripe.customers.create({
          email: token.email,
          source: token.id
        });

        const charge = await stripe.charges.create(
          {
            amount: amount,
            currency: "usd",
            customer: customer.id,
            //receipt_email: token.email,
            //description: `Purchased the ${product.name}`,
          },
        );
        console.log("Charge:", { charge });
        status = "success";
        const payment = new Payment({
            renter_id,
            amount,
            date: date,
        });
        payment.save();
        //res.send('ok');

      } catch (error) {
        console.error("Error:", error);
        status = "failure";
      }
    
      res.send(status);
})*/

router.route('/add').post(async(req, res) =>{
    console.log("Add Payment");
    //const renter_id = req1.body.renter_id;
    //const amount = Number(req1.body.amount);
    //const date = req1.body.date;
    let error;
    let status;

    //console.log('renter_id:' + renter_id + " " +'amount:' + amount);

    try {
        const {payment,token} = req.body;
        //const renter_id = product.renter_id;
        //const amount = Number(product.amount);
        //const date = product.date;
        //console.log('renter_id:' + renter_id + " " +'amount:' + amount);
        console.log(payment);
        const customer = await stripe.customers.create({
          email: token.email,
          source: token.id
        });
        console.log(customer);
        status = "success";

        const renter_id = payment.renter_id;
        const amount = Number(payment.amount);
        const date = payment.date;

        const paymentMongo = new Payment({
            renter_id,
            amount,
            date: date,
        });
        paymentMongo.save();
        //res.send('ok');
        res.send(status);

      } catch (error) {
        console.error("Error:", error);
        status = "failure";
        res.send(status);
      }
})

module.exports = router;