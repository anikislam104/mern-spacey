const router = require('express').Router();
require('dotenv').config();
let Property = require('../models/property');
let Room = require('../models/room');
let Facility = require('../models/facility');
var current_property_id = 0;




router.route('/').get((req, res) => {
  Property.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const hostId = req.body.host_id;
  const title = req.body.title;
  const location = req.body.location;
  const description = req.body.description;
  const size = req.body.size;
  const status = 'Unoccupied';
  const pricePerDay = req.body.pricePerDay;
  const rooms = req.body.rooms;
  const facilities = req.body.facilities;
  const allProperties = await Property.find();


  console.log(rooms);



  const newProperty = new Property({
    hostId,
    title,
    location,
    description,
    size,
    status,
    pricePerDay,
  });

  console.log(newProperty);

  await newProperty.save();
  //.then(() => res.send('property added'))
  //.catch(err => res.status(400).json('Error: ' + err));

  for (let i = 0; i < allProperties.length; i++) {
    current_property_id = allProperties[i]._id;
  }

  console.log(current_property_id);


  for (let i = 0; i < rooms.length; i++) {
    const propertyId = newProperty._id;
    const roomType = rooms[i][0];
    const roomNo = rooms[i][1];
    const newRoom = new Room({
      propertyId,
      roomType,
      roomNo,
    });


    await newRoom.save();
    //.then(() => res.send('room added'))
    //.catch(err => res.status(400).json('Error: ' + err));
  }

  for (let i = 0; i < facilities.length; i++) {
    const propertyId = newProperty._id;
    const facilityType = facilities[i];
    const newFacility = new Facility({
      propertyId,
      facilityType,
    });
    await newFacility.save();
    //.then(() => res.send('facility added'))
    //.catch(err => res.status(400).json('Error: ' + err));
  }

  res.send('property added');
  return;
});



//get all properties
router.route('/all_properties').get((req, res) => {
  Property.find()
    .then(properties => {
      console.log(properties[0].location);
      res.json(properties);
    }
    )
})


//delete property
router.route('/delete_property').post((req, res) => {
  const property_id = req.body.property_id;
  console.log(property_id);
  Property.findByIdAndDelete(property_id)
    .then(() => res.send('property deleted'))
  
});

//edit property
router.route('/edit_property').post((req, res) => {
    const property_id = req.body.property_id;
    const property_title = req.body.property_title;
    const property_location = req.body.property_location;
    const property_description = req.body.property_description;
    const property_size = req.body.property_size;
    const property_price = req.body.property_price;

    Property.findById(property_id)
    .then(property => {
      if(property_title){
        property.title = property_title;
      }
      if(property_location){
        property.location = property_location;
      }
      if(property_description){
        property.description = property_description;
      }
      if(property_size){
        property.size = property_size;
      }
      if(property_price){
        property.pricePerDay = property_price;
      }
      property.save()
      .then(() => res.send('property updated'))
    })
})

//increase room no to one room
router.route('/increase_room').post((req, res) => {
    const room_id = req.body.room_id;
    Room.findById(room_id)
    .then(room => {
      room.roomNo = room.roomNo + 1;
      room.save()
      .then(() => res.send('room updated'))
    })
})

//decrease room no to one room
router.route('/decrease_room').post((req, res) => {
    const room_id = req.body.room_id;
    Room.findById(room_id)
    .then(room => {
      if(room.roomNo > 1){
        room.roomNo = room.roomNo - 1;
        room.save()
        .then(() => res.send('room updated'))
      }
      else
      {
        //delete room
        Room.findByIdAndDelete(room_id)
        .then(() => res.send('room deleted'))
      }
      
    })
})

//add room
router.route('/add_room').post((req, res) => {
  const property_id = req.body.property_id;
  const room_type = req.body.room_type;
  const room_no = req.body.room_no;
  const newRoom = new Room({
    propertyId: property_id,
    roomType: room_type,
    roomNo: room_no,
  });
  newRoom.save()
    .then(() => res.send('room added'))
})

//delete facilities
router.route('/delete_facility').post((req, res) => {
  const facility_id = req.body.facility_id;
  Facility.findByIdAndDelete(facility_id)
    .then(() => res.send('facility deleted'))
})

//add facilities
router.route('/add_facility').post((req, res) => {
  const property_id = req.body.property_id;
  const facility_type = req.body.facility_type;
  const newFacility = new Facility({
    propertyId: property_id,
    facilityType: facility_type,
  });
  newFacility.save()
    .then(() => res.send('facility added'))
})

module.exports = router;
