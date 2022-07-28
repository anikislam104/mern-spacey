const router = require('express').Router();
let User = require('../models/user');
let Booking = require('../models/booking');
let RentRequest = require('../models/rentRequest');

router.route('/selected_property').post((req, res) => {
    console.log("selected_property");
    const property_id = req.body.property_id;
    const host_id = req.body.host_id;
    const location = req.body.location;
    const description = req.body.description;
    const size = req.body.size;
    // const status = req.body.status;
    const pricePerDay = req.body.price;
    console.log("property_id:" + property_id + "host_id:" + host_id + "location:" + location + "description:" + description + "size:" + size + "pricePerDay:" + pricePerDay);
    res.send('ok');
})

router.route('/rentRequest').post(async (req, res) =>
{
    const host_id = req.body.host_id;
    const renter_id = req.body.renter_id;
    const date = req.body.date;
    
    const newRentRequest = new RentRequest({
        host_id,
        renter_id,
        date,
    });

    await newRentRequest.save();
}
)

router.route('/all_rentRequests').get(async (req, res) =>
{
    RentRequest.find()
        .then(rentRequests => {
            //console.log(blogs[0].content);
            res.json(rentRequests);
        })
        .catch(err => res.status(400).json('Error: ' + err));
}
)

router.route('/my_rentRequests').post(async (req, res) =>
{
    const renter_id = req.body.renter_id;
    RentRequest.find({renter_id})
        .then(rentRequests => {
            //console.log(blogs[0].content);
            res.json(rentRequests);
        }).catch(err => res.status(400).json('Error: ' + err));
}
)

router.route('/bookings').post(async (req, res) =>
{
    const host_id = req.body.host_id;
    const renter_id = req.body.renter_id;
    const date = req.body.date;
    const property_id = req.body.property_id;
    const time_start = req.body.time_start;
    const time_end = req.body.time_end;
    
    const newBooking = new Booking({
        host_id,
        renter_id,
        date,
        property_id,
        time_start,
        time_end,
    });

    await newBooking.save();
}
)

module.exports = router;