const router = require('express').Router();
let User = require('../models/user');
let Booking = require('../models/booking');
let RentRequest = require('../models/rentRequest');
const Property = require('../models/property');
const Notification = require('../models/notification');
var selected_property_id = 0;
var selected_property_location = "";
var selected_property_size = 0;
var selected_property_price = 0;
var selected_property_status = "";
var selected_property_description = "";
var selected_property_host_id = "";

router.route('/selected_property').post((req, res) => {
    console.log("selected_property");
    const property_id = req.body.property_id;
    const host_id = req.body.host_id;
    const location = req.body.location;
    const description = req.body.description;
    const size = req.body.size;
    // const status = req.body.status;
    const pricePerDay = req.body.price;

    selected_property_id = property_id;
    selected_property_location = location;
    selected_property_size = size;
    selected_property_price = pricePerDay;
    selected_property_description = description;
    selected_property_host_id = host_id;
    console.log("property_id:" + property_id + " host_id:" + host_id + " location:" + location + " description:" + description + " size:" + size + " pricePerDay:" + pricePerDay);
    res.send('ok');
})
//send selected property to client
router.route('/get_selected_property').get((req, res) => {
    console.log("get_selected_property");
    Property.find()
        .then(properties => {
            properties=properties.filter(property => property._id == selected_property_id);
            res.json(properties);
        })
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

router.route('/send_rental_request').post(async (req, res) =>
{
    const renter_id = req.body.renter_id;
    const property_id = req.body.property_id;
    const date = req.body.date;
    const renter_name = req.body.renter_name;
    const property_title = req.body.property_title;
    const host_id = req.body.host_id;

    console.log("renter_id:" + renter_id + " property_id:" + property_id + " date:" + date + " host_id:" + host_id);

    if(host_id===renter_id){
        res.send("You can't rent your own property");
    }
    else{
        const newRentRequest = new RentRequest({
            host_id,
            renter_id,
            renter_name,
            property_id,
            property_title,
            date,
        });
        newRentRequest.save();
        var message="You have a new rental request from " + renter_name + " for your property " + property_title + " on " + date;
        const newNotification =new Notification( {
            user_id:host_id,
            message,
        });

        newNotification.save();

        res.send('ok');
    }

})


router.route('/accept_rent_request').post(async (req, res) =>
{
    const rent_request_id = req.body.id;
    console.log("rent_request_id:" + rent_request_id);
    const rent_request = await RentRequest.findById(rent_request_id);
    console.log("rent_request:" + rent_request);
    const newBooking = new Booking({
        host_id: rent_request.host_id,
        renter_id: rent_request.renter_id,
        property_id: rent_request.property_id,
        date: rent_request.date,
    });
    await newBooking.save();
    await RentRequest.deleteOne({ _id: rent_request_id });

    var message="Your rental request for " + rent_request.property_title + " on " + rent_request.date + " has been accepted";

    const newNotification =new Notification( {
        user_id: rent_request.renter_id,
        message,
    });
    newNotification.save();

    res.send('ok');
})

router.route('/reject_rent_request').post(async (req, res) =>
{
    const rent_request_id = req.body.id;
    //console.log("rent_request_id:" + rent_request_id);
    const rent_request = await RentRequest.findById(rent_request_id);
    var message="Your rental request for " + rent_request.property_title + " on " + rent_request.date + " has been rejected";
    await RentRequest.deleteOne({ _id: rent_request_id });
    newNotification =new Notification( {
        user_id: rent_request_id,
        message,
    });
    newNotification.save();
    res.send('ok');
})

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
    const host_id = req.body.host_id;
    RentRequest.find()
        .then(rentRequests => {
            rentRequests = rentRequests.filter(rentRequest => rentRequest.host_id == host_id);
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