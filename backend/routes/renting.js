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
    const renter_name = req.body.renter_name;
    const property_title = req.body.property_title;
    const host_id = req.body.host_id;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;

    var start=new Date(start_date);
    var end=new Date(end_date);
    start.setHours(start.getHours() + 6);
    end.setHours(end.getHours() + 6);
    start_date=start.toUTCString();
    end_date=end.toUTCString();

    console.log("renter_id:" + renter_id + " property_id:" + property_id + " host_id:" + host_id);
    console.log("start date: " + start_date + " end date: " + end_date);

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
            start_date: start_date,
            end_date: end_date,
        });
        newRentRequest.save();
        var message="You have a new rental request from " + renter_name + " for your property " + property_title + " from " + start_date + " to " + end_date;
        const newNotification =new Notification( {
            user_id:host_id,
            message:message,
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
    const renter_id = rent_request.renter_id;
    console.log("rent_request:" + rent_request);
    const newBooking = new Booking({
        host_id: rent_request.host_id,
        renter_id: rent_request.renter_id,
        property_id: rent_request.property_id,
        start_time: rent_request.start_date,
        end_time: rent_request.end_date,
    });
    await newBooking.save();
    await RentRequest.deleteOne({ _id: rent_request_id });

    var message="Your rental request for " + rent_request.property_title + " from " + rent_request.start_date + " to "+ rent_request.end_date + " has been accepted";

    const newNotification =new Notification( {
        user_id: renter_id,
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
    const renter_id = rent_request.renter_id;
    var message="Your rental request for " + rent_request.property_title + " from " + rent_request.start_date + " to "+ rent_request.end_date + " has been rejected";
    await RentRequest.deleteOne({ _id: rent_request_id });
    newNotification =new Notification( {
        user_id: renter_id,
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

//get host id of a property

router.route('/get_host_id').post(async (req, res) =>{
    const property_id = req.body.property_id;
    const host_id = await Property.findById(property_id);
    console.log(host_id.hostId);
    res.send(host_id.hostId);
});

//get title of a property
router.route('/get_title').post(async (req, res) =>{
    const property_id = req.body.property_id;
    const title = await Property.findById(property_id);
    console.log(title.title);
    res.send(title.title);
})

//get all booked start dates and end dates of a property
router.route('/get_booked_dates').post(async (req, res) =>{
    const property_id = req.body.property_id;
    console.log("property id " +property_id);
    const bookings = await Booking.find({property_id: property_id});
    //array of tuples (start date, end date)
    var booked_dates = [];
    console.log(bookings.length);
    for(var i=0; i<bookings.length; i++){
        booked_dates.push([bookings[i].start_time, bookings[i].end_time]);
    } 
    console.log(booked_dates);
    res.send(booked_dates);
})
module.exports = router;