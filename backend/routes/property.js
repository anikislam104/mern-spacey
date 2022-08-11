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


module.exports = router;
