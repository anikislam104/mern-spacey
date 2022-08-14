const router = require('express').Router();
let Payment = require('../models/payment');
const stripe = require("stripe")("sk_test_51LQUhSFrHNJyuz7GBJJOrNhKLYVgBkrJsv4nHTiyEE6CbsqrP5Ntg9kuGRoq8RJZSK1l5Ke0CWBUUChp2KE7mq9g00BdwXpg2D");
let User = require('../models/user');
let Property = require('../models/property');
let Booking = require('../models/booking');

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
        const host_email=payment.host_email;
        const renter_email=payment.renter_email;
        const property_title=payment.property_title;

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
            host_email,
            renter_email,
            property_title,
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

      const booking_id = payment.booking_id;
      const renter_id = payment.renter_id;
      const amount = Number(payment.amount);
      const date = payment.date;
      const host_id=payment.host_id;
      const property_id=payment.property_id;
      const status=payment.status;
      const update_date=payment.update_date;
      const host_email=payment.host_email;
      const renter_email=payment.renter_email;
      const property_title=payment.property_title;

      res_status = "success";

      const paymentMongo = new Payment({
          renter_id,
          amount,
          host_id,
          property_id,
          status,
          host_email,
          renter_email,
          property_title,
          date: date,
          update_date: date,
          token_id: 'cash',
          charge_id: 'cash',
          customer_id: 'cash',
          payment_method: 'cash',
          booking_id: booking_id,
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

router.route('/get_host_email').post((req,res)=>{
  const host_id=req.body.host_id;
  //console.log("Host ID: "+host_id);

    User.findById(host_id)
     .then(user=>{
          //console.log(user.email);
          res.json(user.email);
     })
})

router.route('/get_property_title').post((req,res)=>{
  const property_id=req.body.property_id;
  //console.log("Property ID: "+property_id);

    Property.findById(property_id)
     .then(property=>{
          //console.log(property.title);
          res.json(property.title);
     })
})

router.route('/get_renter_point').post((req,res)=>{
  const renter_id=req.body.renter_id;

    User.findById(renter_id)
     .then(user=>{
        //console.log(user.point*0.05);
        let point=parseInt(user.point);
        //user.point=4;
        //user.save();
        res.json(point);
     })
})

router.route('/get_renter_discount').post((req,res)=>{
  const renter_id=req.body.renter_id;
  const amount=req.body.amount;
  //console.log("Amount: "+amount);
  let discount=0;

    User.findById(renter_id)
     .then(user=>{
        //console.log(user.point*0.05);
        let point=parseInt(user.point);
        if(point>=5){
          discount=amount*0.05;
        }
        res.json(discount);
     })
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
  //console.log("Payment ID: "+payment_id);
  let amount=0;
  //const renter_id='';

 /* Payment.findById(payment_id)
     .then(payment=>{
        amount=parseInt(payment.amount);
        renter_id=payment.renter_id;
  })

  User.findById(renter_id)
     .then(user=>{
        //console.log(user.point*0.05);
        let point=parseInt(user.point);
        console.log("Point: "+point+"    Amount: "+amount);
        point+=(amount/100);
        console.log("Point: "+point+"    Amount: "+amount);
        user.point=point;
        user.save();
  })*/

  Payment.findById(payment_id)
     .then(payment=>{
          payment.status='approved';
          payment.update_date=new Date();
          amount=parseInt(payment.amount);

          User.findById(payment.renter_id)
              .then(user=>{
                  //console.log(user.point*0.05);
                  let point=parseInt(user.point);
                  console.log("Point: "+point+"    Amount: "+amount);
                  point+=(amount/100);
                  console.log("Point: "+point+"    Amount: "+amount);
                  user.point=point;
                  user.save();
              })  

          payment.save();
          console.log(payment);
          res.json('ok');
     })
})

router.route('/rejectRenterPayment').post((req,res)=>{
  const payment_id=req.body.payment_id;
  //console.log("Payment ID: "+payment_id);

  Payment.findById(payment_id)
     .then(payment=>{
          payment.status='rejected';
          payment.update_date=new Date();
          payment.save();
          console.log(payment);
          res.json('ok');
     })
})

router.route('/get_payment_history').post(async (req, res) => {
  const user_id = req.body.user_id;

  Payment.find()
    .then(payments => {
        payments=payments.filter(payment=>(payment.host_id==user_id || payment.renter_id==user_id) && payment.status=='approved'); 
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

router.route('/get_total_income').post(async (req, res) => {
  const user_id = req.body.user_id;
  let income=0;
  Payment.find()
    .then(payments => {
        payments=payments.filter(payment=>payment.host_id==user_id && payment.status=='approved'); 
        for(let i=0;i<payments.length;i++){
           income+=parseInt(payments[i].amount);
        }
        //console.log(income);
        res.json(income);
    })
})

router.route('/get_income_between_days').post(async (req, res) => {
  const user_id = req.body.user_id;
  let date1=new Date(req.body.date1);
  let date2=new Date(req.body.date2);
  //console.log(date1+"   "+date2);
  let income=0;
  Payment.find()
    .then(payments => {
        payments=payments.filter(payment=>payment.host_id==user_id && payment.status=='approved'); 
        for(let i=0;i<payments.length;i++){
           let db_date=new Date(payments[i].date); 
           //console.log(db_date+"   "+date1+"   "+date2);
           //console.log(db_date.getTime()+"   "+date1.getTime()+"   "+date2.getTime());
           if(db_date.getTime()>=date1.getTime() && db_date.getTime()<=date2.getTime()){
              income+=parseInt(payments[i].amount);
           }
        }
        //console.log(income);
        res.json(income);
    })
})

//get host id and property id from booking id
router.route('/host_property_id').post(async (req, res) => {
  const booking_id = req.body.booking_id;
  let host_id='';
  let property_id='';
  let amount='';
  Booking.findById(booking_id)
    .then(booking=>{
        console.log(booking);
        host_id=booking.host_id;
        property_id=booking.property_id;
        amount=booking.price;
        res.json({host_id:host_id,property_id:property_id,amount:amount});
    })
})

module.exports = router;