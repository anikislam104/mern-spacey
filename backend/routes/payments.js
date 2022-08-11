const router = require('express').Router();
let Payment = require('../models/payment');
const stripe = require("stripe")("sk_test_51LQUhSFrHNJyuz7GBJJOrNhKLYVgBkrJsv4nHTiyEE6CbsqrP5Ntg9kuGRoq8RJZSK1l5Ke0CWBUUChp2KE7mq9g00BdwXpg2D");
let User = require('../models/user');

router.route('/add_in_mobileBanking').post(async(req, res) =>{
    console.log("Add Payment");
    let error;
    let res_status;

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
        const host_id=payment.host_id;
        const property_id=payment.property_id;
        const status=payment.status;
        const update_date=payment.update_date;

        const charge=await stripe.charges.create({
          amount: amount*100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
        });
        console.log("Charge_amount: "+ charge.amount/100+" ,Charge ID:"+charge.id+" ,Customer ID: "+charge.customer +" ,Payment method: "+charge.payment_method);
        res_status = "success";

        const paymentMongo = new Payment({
            renter_id,
            amount,
            host_id,
            property_id,
            status,
            date: date,
            update_date: date,
            token_id: token.id,
            charge_id: charge.id,
            customer_id: charge.customer,
            payment_method: charge.payment_method,
        });
        paymentMongo.save();

        User.findById(host_id, (err, User)=>{
          if(err){
            console.log("Host not found in backend");
          }
        });

        res.send(res_status);

      } catch (error) {
        console.error("Error:", error);
        res_status = "failure";
        res.send(res_status);
      }
})

router.route('/add_in_cash').post(async(req, res) =>{
  console.log("Add Payment");
  let error;
  let res_status;

  try { 
      const payment = req.body;
      console.log(payment);

      const renter_id = payment.renter_id;
      const amount = Number(payment.amount);
      const date = payment.date;
      const host_id=payment.host_id;
      const property_id=payment.property_id;
      const status=payment.status;
      const update_date=payment.update_date;

      res_status = "success";

      const paymentMongo = new Payment({
          renter_id,
          amount,
          host_id,
          property_id,
          status,
          date: date,
          update_date: date,
          token_id: 'cash',
          charge_id: 'cash',
          customer_id: 'cash',
          payment_method: 'cash',
      });
      paymentMongo.save();

      User.findById(host_id, (err, User)=>{
        if(err){
          console.log("Host not found in backend");
        }
      });

      res.send(res_status);

    } catch (error) {
      console.error("Error:", error);
      res_status = "failure";
      res.send(res_status);
    }
})

//get notificatoins
router.route('/get_payment_notifications').post(async (req, res) => {
  const user_id = req.body.user_id;

  Payment.find()
    .then(payments => {
        payments=payments.filter(payment=>payment.host_id==user_id || payment.renter_id==user_id); 
        payments.sort((a,b)=>{
          let da = new Date(a.update_date),
              db = new Date(b.update_date);
          //console.log(db.getTime()+"   "+da.getTime());    
          return db.getTime() - da.getTime();
        });
        //console.log(payments);
        res.json(payments);
    })
})

/*
router.route('/get_payment_notifications_as_host').post(async (req, res) => {
  const user_id = req.body.user_id;

  Payment.find()
    .then(payments => {
        payments=payments.filter(payment=>payment.host_id==user_id && payment.status=='pending'); 
        payments.sort((a,b)=>{
          let da = new Date(a.update_date),
              db = new Date(b.update_date);
          //console.log(db.getTime()+"   "+da.getTime());    
          return db.getTime() - da.getTime();
        });
        res.json(payments);
    })
})

router.route('/get_payment_notifications_as_renter').post(async (req, res) => {
  const user_id = req.body.user_id;

  Payment.find()
    .then(payments => {
        payments=payments.filter(payment=>payment.renter_id==user_id); 
        payments.sort((a,b)=>{
          let da = new Date(a.update_date),
              db = new Date(b.update_date);
          //console.log(db.getTime()+"   "+da.getTime());    
          return db.getTime() - da.getTime();
        });
        res.json(payments);
    })
})
*/

router.route('/approveRenterPayment').post((req,res)=>{
  const payment_id=req.body.payment_id;
  console.log("Payment ID: "+payment_id);

  Payment.findById(payment_id)
     .then(payment=>{
          payment.status='approved';
          payment.update_date=new Date();
          payment.save();
          console.log(payment);
          res.json('ok');
     })
})

router.route('/rejectRenterPayment').post((req,res)=>{
  const payment_id=req.body.payment_id;
  console.log("Payment ID: "+payment_id);

  Payment.findById(payment_id)
     .then(payment=>{
          payment.status='rejected';
          payment.update_date=new Date();
          payment.save();
          console.log(payment);
          res.json('ok');
     })
})

module.exports = router;