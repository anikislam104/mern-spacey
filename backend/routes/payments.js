const router = require('express').Router();
let Payment = require('../models/payment');
const stripe = require("stripe")("sk_test_51LQUhSFrHNJyuz7GBJJOrNhKLYVgBkrJsv4nHTiyEE6CbsqrP5Ntg9kuGRoq8RJZSK1l5Ke0CWBUUChp2KE7mq9g00BdwXpg2D");

router.route('/add').post(async(req, res) =>{
    console.log("Add Payment");
    let error;
    let status;

    try { 
        const {payment,token} = req.body;
        console.log(payment);
        const customer = await stripe.customers.create({
          email: token.email,
          source: token.id
        });
        console.log("Token ID: "+token.id+ " ,Customer email: "+customer.email);

        const renter_id = payment.renter_id;
        const amount = Number(payment.amount);
        const date = payment.date;

        const charge=await stripe.charges.create({
          amount: amount*100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
        });
        console.log("Charge_amount: "+ charge.amount/100+" ,Charge ID:"+charge.id+" ,Customer ID: "+charge.customer +" ,Payment method: "+charge.payment_method);
        status = "success";

        const paymentMongo = new Payment({
            renter_id,
            amount,
            date: date,
            token_id: token.id,
            charge_id: charge.id,
            customer_id: charge.customer,
            payment_method: charge.payment_method,
        });
        paymentMongo.save();
        res.send(status);

      } catch (error) {
        console.error("Error:", error);
        status = "failure";
        res.send(status);
      }
})

module.exports = router;