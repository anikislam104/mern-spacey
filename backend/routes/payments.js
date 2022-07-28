const router = require('express').Router();
let Payment = require('../models/payment');

router.route('/add').post((req, res) =>{
    console.log("Add Payment");
    const renter_id = req.body.renter_id;
    const amount = Number(req.body.amount);
    //const date = req.body.date;

    console.log('renter_id:' + renter_id + 'amount:' + amount);

    const payment = new Payment({
        renter_id,
        amount,
        //date: date,
    });
    payment.save();
    res.send('ok');
})

module.exports = router;