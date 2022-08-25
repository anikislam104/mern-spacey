const router = require('express').Router();
let User = require('../models/user');
let Booking = require('../models/booking');
let RentRequest = require('../models/rentRequest');
const Property = require('../models/property');
const Notification = require('../models/notification');
let Facility = require('../models/facility');
let Room = require('../models/room');
let ExtendBookingRequest = require('../models/extendBookingRequest');
let ReviewRating = require('../models/rating_review');
let Complaint = require('../models/complaint');

const { request } = require('express');

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
    var today=new Date();

    console.log("renter_id:" + renter_id + " property_id:" + property_id + " host_id:" + host_id);
    console.log("start date: " + start_date + " end date: " + end_date);

    if(host_id===renter_id){
        res.send("You cannot rent your own property");
    }
    else if(start>end || start===end || today>start || today>end){
        res.send("Invalid date");
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
        var message="You have a new rental request from " + renter_name + " for your property " + property_title ;
        const newNotification =new Notification( {
            user_id:host_id,
            message:message,
            type:"rental_request",
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
    //calculate price
    const start_date = rent_request.start_date;
    const end_date = rent_request.end_date;
    var difference = Math.abs(new Date(end_date).getTime() - new Date(start_date).getTime());
    var days = Math.ceil(difference / (1000 * 3600 * 24));
    
    const property = await Property.findById(rent_request.property_id);
    const pricePerDay = property.pricePerDay;
    const price = days * pricePerDay;
    const newBooking = new Booking({
        host_id: rent_request.host_id,
        renter_id: rent_request.renter_id,
        property_id: rent_request.property_id,
        start_time: rent_request.start_date,
        end_time: rent_request.end_date,
        price: price,
    });
    await newBooking.save();
    await RentRequest.deleteOne({ _id: rent_request_id });

    var message="Your rental request for " + rent_request.property_title +  " has been accepted";

    const newNotification =new Notification( {
        user_id: renter_id,
        message,
        type:"booking",
    });
    newNotification.save();

    res.send('ok');
})

router.route('/reject_rent_request').post(async (req, res) =>
{
    const rent_request_id = req.body.id;
    //console.log("rent_request_id:" + rent_request_id);
    const rent_request = await RentRequest.findBNotificationYouyId(rent_request_id);
    const renter_id = rent_request.renter_id;
    var message="Your rental request for " + rent_request.property_title +  " has been rejected";
    await RentRequest.deleteOne({ _id: rent_request_id });
    newNotification =new Notification( {
        user_id: renter_id,
        message,
        type:"booking",
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

//get my bookings
router.route('/get_my_bookings').post(async (req, res) =>{
    const user_id = req.body.user_id;
    const bookings = await Booking.find({renter_id: user_id});
    console.log(bookings.length);
    res.send(bookings);
})

//checking if own property

router.route('/check_if_mine').post(async (req,res) =>{
    const user_id = req.body.user_id;
    const property_id = req.body.property_id;
    const property = await Property.findById(property_id);
    if(property.hostId == user_id){
        res.send("yes");
    }
    else{
        res.send("no");
    }
}
)

//get current bookings
router.route('/get_current_bookings').post(async (req, res) =>{
    const user_id = req.body.user_id;
    const bookings = await Booking.find({renter_id: user_id});
    console.log("s "+bookings.length);
    var current_bookings = [];
    for(var i=0; i<bookings.length; i++){
        var start_date = bookings[i].start_time;
        var end_date = bookings[i].end_time;
        
        const host = await User.findById(bookings[i].host_id);
        host_name = host.firstName + " " + host.lastName;
        
        const property = await Property.findById(bookings[i].property_id);
        property_title = property.title;
        //get difference between start date and end date
        price = bookings[i].price;
        
        

        var today = new Date();
        console.log(bookings[i].payment_status);

        if(bookings[i].payment_status == "pending")
            current_bookings.push([bookings[i]._id, host_name, property_title, start_date, end_date,price,bookings[i].property_id]);
        
    }
    


    console.log(current_bookings);
    res.send(current_bookings);
})

//sending change duration request
router.route('/send_change_duration_request').post(async (req, res) =>{
    var booking_id = req.body.booking_id;
    var new_end_date = req.body.end_date;
    var end=new Date(new_end_date);
    // start.setHours(start.getHours() + 6);
    end.setHours(end.getHours() + 6);
    // start_date=start.toUTCString();
    new_end_date=end;

    console.log("booking id " + booking_id);
    console.log("new end date " + new_end_date);
    //create extend booking request
    const extend_booking_request = new ExtendBookingRequest({
        booking_id: booking_id,
        end_date: new_end_date,
    });

    const booking = await Booking.findById(booking_id);
    const start = booking.start_time;
    const old_end_date = booking.end_time;
    console.log("old end date " + old_end_date);
    console.log("start date " + start);
    console.log(start>new_end_date);
    var today = new Date();

    //difference between today and old end date in days

    var difference = old_end_date.getTime() - today.getTime();
    console.log(difference);
    var days = difference/(1000*60*60*24);
    console.log(days);



   

    var bookings = await Booking.find({property_id: booking.property_id});
    //exclude booking itself
    bookings=bookings.filter(booking => booking._id != booking_id);
    var is_booked = false;
    var err="";
    if(new_end_date<start){
        console.log("start date " + start_date+ " end date " + end_date);
        is_booked = true;
        err="End date cannot be before start date";
    }
     //check if there is any booking between old end date and new end date
    else{
        for(var i=0; i<bookings.length; i++){
            var start_date = bookings[i].start_time;
            var end_date = bookings[i].end_time;
            if(days<1){
                err="You cannot extend the booking before less than 1 day";
                is_booked = true;
                break;
            }
            if(start_date>old_end_date && start_date<new_end_date){
                console.log("start date " + start_date+ " end date " + end_date);
                is_booked = true;
                err="There is a booking between the new end date and the old end date";
                break;
            }
            
        }
    }

    if(is_booked){
        res.send(err);
    }
    else{
        //save extend booking request
        await extend_booking_request.save();
        //send notification to host
        const host_id = booking.host_id;
        //get renter's name
        const renter = await User.findById(booking.renter_id);
        const renter_name = renter.firstName + " " + renter.lastName;
        const message = "You have a new extend booking request from " + renter_name;
        const notification = new Notification({
            user_id: host_id,
            message: message,
            type: "extend",
        });
        await notification.save();
        res.send('ok');
    }
    
    
})

//get extend booking requests
router.route('/get_extend_booking_requests').post(async (req, res) =>{
    const user_id = req.body.user_id;
    var renter_name="";
    var property_title="";
    var start_date="";
    var end_date="";
    // var new_end_date="";
    
    //get all extend booking requests
    const extend_booking_requests = await ExtendBookingRequest.find({});
    console.log(extend_booking_requests.length);

    var requests = [];
    for(var i=0; i<extend_booking_requests.length; i++){
        var req_id=extend_booking_requests[i]._id;
        var booking_id = extend_booking_requests[i].booking_id;
        var new_end_date = extend_booking_requests[i].end_date;

        console.log("booking id " + booking_id);
        
        const booking = await Booking.findById(booking_id);
        //check if host id is the same as user id
        console.log(booking);
        if(booking.host_id  == user_id){
            //get renter name
            const renter = await User.findById(booking.renter_id);
            renter_name = renter.firstName + " " + renter.lastName;
            console.log(renter_name);
            //get property title
            const property = await Property.findById(booking.property_id);
            property_title = property.title;
            console.log(property_title);
            //get start date
            start_date = booking.start_time;
            console.log(start_date);
            //get end date
            end_date = booking.end_time;
            console.log(end_date);

            requests.push([req_id, renter_name, property_title, start_date, end_date, new_end_date]);
        }
    }
    console.log(requests);
    res.send(requests);

})

//accept extend booking request
router.route('/accept_extend_booking_request').post(async (req, res) =>{
    const request_id = req.body.request_id;
    console.log(request_id);
    const extend_booking_request = await ExtendBookingRequest.findById(request_id);
    const booking_id = extend_booking_request.booking_id;
    console.log(booking_id);
    const booking = await Booking.findById(booking_id);
    const new_end_date = extend_booking_request.end_date;
    console.log(new_end_date);
    //set new end date in booking
    const start_date = booking.start_time;
    //calculate difference in days between start date and new end date
    var difference = new_end_date.getTime() - start_date.getTime();
    var days = difference/(1000*60*60*24);
    const property = await Property.findById(booking.property_id);
    var pricePerDay = property.pricePerDay;
    var total_price = days*pricePerDay;

    booking.price = total_price;
    booking.end_time = new_end_date;
    await booking.save();
    //delete extend booking request
    const notification = new Notification({
        user_id: booking.renter_id,
        message: "Your booking has been extended",
        type: "booking",
    });
    await notification.save();
    await ExtendBookingRequest.deleteOne({_id: request_id})
    .then(() => {
        res.send('ok');
    });
})

//decline extend booking request
router.route('/decline_extend_booking_request').post(async (req, res) =>{
    const request_id = req.body.request_id;
    console.log(request_id);
    const extend_booking_request = await ExtendBookingRequest.findById(request_id);
    const booking_id = extend_booking_request.booking_id;
    console.log(booking_id);
    const booking = await Booking.findById(booking_id);
    const notification = new Notification({
        user_id: booking.renter_id,
        message: "Your booking extension request has been declined",
        type: "booking",
    });
    await notification.save();
    await ExtendBookingRequest.deleteOne({_id: request_id})
    .then(() => {
        res.send('ok');
    });
})

//cancel booking
router.route('/cancel_booking').post(async (req, res) =>{
    const booking_id = req.body.booking_id;
    console.log(booking_id);
    const booking = await Booking.findById(booking_id);
    const start_date = booking.start_time;
    const today = new Date();
    const difference = start_date.getTime() - today.getTime();
    var days = difference/(1000*60*60*24);
    console.log(days);
    if(days>0){
        const notification = new Notification({
            user_id: booking.renter_id,
            message: "Your booking has been cancelled",
            type: "booking",
        });
        await notification.save();
        //get Property name
        const property = await Property.findById(booking.property_id);
        const property_title = property.title;
        //get renter name
        const renter = await User.findById(booking.renter_id);
        const renter_name = renter.firstName + " " + renter.lastName;
        const message = renter_name + " has cancelled his booking for " + property_title;
        const notification_message = new Notification({
            user_id: booking.host_id,
            message: message,
            type: "hosting",
        });
        await notification_message.save();
        await Booking.deleteOne({_id: booking_id})
        .then(() => {
            res.send('pre');
        });
    }
    else{
        //ceil days variable
        res.send('curr');
    }

})

//set a timer to track the end date of the booking
router.route('/get_time').post(async (req, res) =>{
    const booking_id = req.body.booking_id;
    const booking = await Booking.findById(booking_id);
    const end_date = booking.end_time;
    const today = new Date();
    const difference = end_date.getTime() - today.getTime();
    var days = difference/(1000*60*60*24);
    console.log(days);
    if(days<0){
        res.send('ok');
    }
    else{
        res.send('curr');
    }
})

//get past bookings

router.route('/get_past_bookings').post(async (req, res) =>{
    const user_id = req.body.user_id;
    const bookings = await Booking.find({renter_id: user_id});
    console.log("s "+bookings.length);
    var past_bookings = [];
    for(var i=0; i<bookings.length; i++){
        var start_date = bookings[i].start_time;
        var end_date = bookings[i].end_time;
        
        const host = await User.findById(bookings[i].host_id);
        host_name = host.firstName + " " + host.lastName;
        
        const property = await Property.findById(bookings[i].property_id);
        property_title = property.title;
        //get difference between start date and end date
        
        price = bookings[i].price;
        
       
        


        var today = new Date();

        if(bookings[i].payment_status=="Paid")
            past_bookings.push([bookings[i]._id, host_name, property_title, start_date, end_date,price,bookings[i].property_id]);
        
    }
    console.log(past_bookings);
    res.send(past_bookings);
})

//get my current hostings
router.route('/get_current_hostings').post(async (req, res) =>{
    const user_id = req.body.user_id;
    const bookings = await Booking.find({host_id: user_id});
    console.log("s "+bookings.length);
    var current_hostings = [];
    for(var i=0; i<bookings.length; i++){
        var start_date = bookings[i].start_time;
        var end_date = bookings[i].end_time;
        
        const renter = await User.findById(bookings[i].renter_id);
        renter_name = renter.firstName + " " + renter.lastName;
        
        const property = await Property.findById(bookings[i].property_id);
        property_title = property.title;
        //get difference between start date and end date
        
        price = bookings[i].price;
        if(bookings[i].payment_status=="pending")
            current_hostings.push([bookings[i]._id, renter_name, property_title, start_date, end_date,price]);
    }
    console.log(current_hostings);
    res.send(current_hostings);
})

//get my past hostings
router.route('/get_past_hostings').post(async (req, res) =>{
    const user_id = req.body.user_id;
    const bookings = await Booking.find({host_id: user_id});
    console.log("s "+bookings.length);
    var past_hostings = [];
    for(var i=0; i<bookings.length; i++){
        var start_date = bookings[i].start_time;
        var end_date = bookings[i].end_time;
        
        const renter = await User.findById(bookings[i].renter_id);
        renter_name = renter.firstName + " " + renter.lastName;
        
        const property = await Property.findById(bookings[i].property_id);
        property_title = property.title;
        //get difference between start date and end date
        
        price = bookings[i].price;
        if(bookings[i].payment_status=="Paid")
            past_hostings.push([bookings[i]._id, renter_name, property_title, start_date, end_date,price]);
    }
    console.log(past_hostings);
    res.send(past_hostings);
})

//set rating review
router.route('/set_rating_review').post(async (req, res) =>{
    const booking_id = req.body.booking_id;
    const rating = req.body.rating;
    const review = req.body.review;
    
    const booking = await Booking.findById(booking_id);

    const property_id = booking.property_id;
    const property = await Property.findById(property_id);
    
    //get title
    const property_title = property.title;
    
    //check if already rated
    const rating_review = await ReviewRating.findOne({booking_id: booking_id});
    if(rating_review){
        res.send('already rated');
    }
    //create a new review rating
    else{
        const review_rating = new ReviewRating({
            booking_id: booking_id,
            property_id: property_id,
            rating: rating,
            review: review,
        });
        await review_rating.save();

        //send notification to host
        const host_id = booking.host_id;
        const newNotification = new Notification({
            user_id: host_id,
            message: "You have received a new review for your property "+property_title,
            type: "review",
        });
        await newNotification.save();
        res.send('ok');
    }
    
})

//get all reviews and ratings of a property
router.route('/get_reviews_ratings').post(async (req, res) =>{
    const property_id = req.body.property_id;
    const reviews_ratings = await ReviewRating.find({property_id: property_id});
    var reviews = [];
    for(var i=0; i<reviews_ratings.length; i++){
        const booking = await Booking.findById(reviews_ratings[i].booking_id);
        const renter = await User.findById(booking.renter_id);
        renter_name = renter.firstName + " " + renter.lastName;
        reviews.push([renter_name, reviews_ratings[i].rating, reviews_ratings[i].review]);
    }
    console.log(reviews);
    res.send(reviews);
})

//set renter complaint
router.route('/set_renter_complaint').post(async (req, res) =>{
    const booking_id = req.body.booking_id;
    const complaint = req.body.complaint;

    const booking = await Booking.findById(booking_id);
    const renter_id = booking.renter_id;
    const host_id = booking.host_id;

    //get renter name
    const renter = await User.findById(renter_id);
    renter_name = renter.firstName + " " + renter.lastName;

    //get property and title
    const property = await Property.findById(booking.property_id);
    const property_title = property.title;

    //create new complaint
    const newComplaint = new Complaint({
        booking_id: booking_id,
        complainant_id: renter_id,
        complainee_id: host_id,
        complaint: complaint,
    });
    await newComplaint.save();

    //send notification to host
    const newNotification = new Notification({
        user_id: host_id,
        message: "You have received a new complaint from a renter named " + renter_name + " for your property " + property_title,
        type: "hosting",
    });
    await newNotification.save();
    res.send('ok');
})

//set host complaint
router.route('/set_host_complaint').post(async (req, res) =>{
    const booking_id = req.body.booking_id;
    const complaint = req.body.complaint;

    const booking = await Booking.findById(booking_id);
    const renter_id = booking.renter_id;
    const host_id = booking.host_id;

    //get host name
    const host = await User.findById(host_id);
    host_name = host.firstName + " " + host.lastName;

    //get property and title
    const property = await Property.findById(booking.property_id);
    const property_title = property.title;

    //create new complaint
    const newComplaint = new Complaint({
        booking_id: booking_id,
        complainant_id: host_id,
        complainee_id: renter_id,
        complaint: complaint,
    });
    await newComplaint.save();

    //send notification to renter
    const newNotification = new Notification({
        user_id: renter_id,
        message: "You have received a new complaint from a host named " + host_name + " for your booked property " + property_title,
        type: "booking",
    });
    await newNotification.save();
    res.send('ok');
})

module.exports = router;