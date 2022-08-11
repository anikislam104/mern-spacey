const router = require('express').Router();
let User = require('../models/user');
let Booking = require('../models/booking');
let RentRequest = require('../models/rentRequest');
const Property = require('../models/property');
const Notification = require('../models/notification');
let Facility = require('../models/facility');
let Room = require('../models/room');

router.route('/selected_property').post((req, res) => {
    console.log("selected_property");
    const property_id = req.body.property_id;
    const host_id = req.body.host_id;
    const location = req.body.location;
    const description = req.body.description;
    const size = req.body.size;
    // const status = req.body.status;
    const pricePerDay = req.body.price;

    
    console.log("property_id:" + property_id + " host_id:" + host_id + " location:" + location + " description:" + description + " size:" + size + " pricePerDay:" + pricePerDay);
    res.send('ok');
})
//send selected property to client
router.route('/get_selected_property').post(async(req, res) => {
    const selected_property_id=req.body.property_id;
    console.log("selected_property_id: " + selected_property_id);
    const property = await Property.findById(selected_property_id);
    console.log(property);
    res.send(property);
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

//get rooms of a property
router.route('/get_rooms').post(async (req, res) =>{
    const property_id = req.body.property_id;
    const rooms = await Room.find({propertyId: property_id});
    console.log(rooms.length);
    res.send(rooms);
})

//get facilities of a property
router.route('/get_facilities').post(async (req, res) =>{
    const property_id = req.body.property_id;
    const facilities = await Facility.find({propertyId: property_id});
    console.log(facilities.length);
    res.send(facilities);
})

module.exports = router;