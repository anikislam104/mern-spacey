const router = require("express").Router();
require("dotenv").config();
let Property = require("../models/property");
let Room = require("../models/room");
let Facility = require("../models/facility");
const multer = require("multer");
var current_property_id = 0;
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");
const ContentBasedRecommender = require("content-based-recommender");
var recommendedProperties = [];

/*router.route('/').get((req, res) => {
  Property.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/add").post(upload.single("image"), async (req, res) => {
  const hostId = req.body.host_id;
  const title = req.body.title;
  const location = req.body.location;
  const description = req.body.description;
  const size = req.body.size;
  const status = "Unoccupied";
  const pricePerDay = req.body.pricePerDay;
  const rooms = req.body.rooms;
  const facilities = req.body.facilities;
  const image = req.file.originalname;
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
    image,
  });

  console.log(newProperty);

  await newProperty.save();
  //.then(() => res.send('property added'))
  //.catch(err => res.status(400).json('Error: ' + err));

  for (let i = 0; i < allProperties.length; i++) {
    current_property_id = allProperties[i]._id;
  }

  console.log(current_property_id);

  //declare 2d array to store rooms
  let room_array = [];
  var idx = 0;
  //count comma in rooms string
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i] == ",") {
      idx++;
    }
  }
  //room array size is the number of commas + 1
  room_array.length = idx + 1;
  //initialize room array
  for (let i = 0; i < room_array.length; i++) {
    room_array[i] = "";
  }
  idx = 0;
  for (let i = 0; i < rooms.length; i++) {
    //add into room_array[idx] until , comes
    if (rooms[i] != ",") {
      room_array[idx] += rooms[i];
      //take substring excluding first 9 characters from rooms[i]
      // if(rooms[i].substring(0,9)=='undefined'){
      //   room_array[idx]=room_array[idx].substring(9);
      // }
    }
    //if , comes, then skip , and add next char into next array element
    else {
      idx++;
    }
  }
  console.log(room_array);

  for (let i = 0; i < room_array.length; i++) {
    const propertyId = newProperty._id;
    const roomType = room_array[i];
    const roomNo = Number(room_array[i + 1]);
    console.log(roomType + " " + roomNo);
    const newRoom = new Room({
      propertyId,
      roomType,
      roomNo,
    });

    await newRoom.save();
    i++;
    //.then(() => res.send('room added'))
    //.catch(err => res.status(400).json('Error: ' + err));
  }

  //calculate number of commas in facilities string
  var idx = 0;
  for (let i = 0; i < facilities.length; i++) {
    if (facilities[i] == ",") {
      idx++;
    }
  }

  //facility array size is the number of commas + 1
  let facility_array = [];
  facility_array.length = idx + 1;
  //initialize facility array
  for (let i = 0; i < facility_array.length; i++) {
    facility_array[i] = "";
  }
  idx = 0;
  for (let i = 0; i < facilities.length; i++) {
    //add into facility_array[idx] until , comes
    if (facilities[i] != ",") {
      facility_array[idx] += facilities[i];
    }
    //if , comes, then skip , and add next char into next array element
    else {
      idx++;
    }
  }
  console.log(facility_array);

  for (let i = 0; i < facility_array.length; i++) {
    const propertyId = newProperty._id;
    const facilityType = facility_array[i];
    const newFacility = new Facility({
      propertyId,
      facilityType,
    });
    await newFacility.save();
    //.then(() => res.send('facility added'))
    //.catch(err => res.status(400).json('Error: ' + err));
  }

  res.send("property added");
  return;
});

//get all properties
router.route("/all_properties").post(async (req, res) => {
  console.log(req.body);
  const user_id = req.body.user_id;
  Property.find().then((properties) => {
    //exclude user's own properties
    let filtered_properties = properties.filter(
      (property) => property.hostId != user_id
    );
    console.log(filtered_properties);
    res.json(filtered_properties);
  });
});

//delete property
router.route("/delete_property").post((req, res) => {
  const property_id = req.body.property_id;
  console.log(property_id);
  Property.findByIdAndDelete(property_id).then(() =>
    res.send("property deleted")
  );
});

//edit property
router.route("/edit_property").post((req, res) => {
  const property_id = req.body.property_id;
  const property_title = req.body.property_title;
  const property_location = req.body.property_location;
  const property_description = req.body.property_description;
  const property_size = req.body.property_size;
  const property_price = req.body.property_price;

  Property.findById(property_id).then((property) => {
    if (property_title) {
      property.title = property_title;
    }
    if (property_location) {
      property.location = property_location;
    }
    if (property_description) {
      property.description = property_description;
    }
    if (property_size) {
      property.size = property_size;
    }
    if (property_price) {
      property.pricePerDay = property_price;
    }
    property.save().then(() => res.send("property updated"));
  });
});

//increase room no to one room
router.route("/increase_room").post((req, res) => {
  const room_id = req.body.room_id;
  Room.findById(room_id).then((room) => {
    room.roomNo = room.roomNo + 1;
    room.save().then(() => res.send("room updated"));
  });
});

//decrease room no to one room
router.route("/decrease_room").post((req, res) => {
  const room_id = req.body.room_id;
  Room.findById(room_id).then((room) => {
    if (room.roomNo > 1) {
      room.roomNo = room.roomNo - 1;
      room.save().then(() => res.send("room updated"));
    } else {
      //delete room
      Room.findByIdAndDelete(room_id).then(() => res.send("room deleted"));
    }
  });
});

//add room
router.route("/add_room").post((req, res) => {
  const property_id = req.body.property_id;
  const room_type = req.body.room_type;
  const room_no = req.body.room_no;
  const newRoom = new Room({
    propertyId: property_id,
    roomType: room_type,
    roomNo: room_no,
  });
  newRoom.save().then(() => res.send("room added"));
});

//delete facilities
router.route("/delete_facility").post((req, res) => {
  const facility_id = req.body.facility_id;
  Facility.findByIdAndDelete(facility_id).then(() =>
    res.send("facility deleted")
  );
});

//add facilities
router.route("/add_facility").post((req, res) => {
  const property_id = req.body.property_id;
  const facility_type = req.body.facility_type;
  const newFacility = new Facility({
    propertyId: property_id,
    facilityType: facility_type,
  });
  newFacility.save().then(() => res.send("facility added"));
});

router.route("/").get(
  protect,
  asyncHandler(async (req, res) => {
    // finding all users which matches search
    console.log("search " + req.query.search);
    const keyword = req.query.search
      ? {
          $or: [
            { title: { $regex: req.query.search, $options: "i" } }, // search name that have same pattern as req.query.search
            { location: { $regex: req.query.search, $options: "i" } }, // search email that have same pattern as req.query.search
          ],
        }
      : {};

    const properties = await Property.find(keyword); // protect above modifies req to have req.user._id as current user id
    console.log(properties);
    res.send(properties);
  })
);

router.route("/get_rec").get(
  protect,
  asyncHandler(async (req, res) => {
    const recommender = new ContentBasedRecommender({
      minScore: 0.1,
      maxSimilarDocs: 100,
    });
    const user_id = req.user._id;
    const documents = [];
    var filtered_properties = [];
    Property.find().then((properties) => {
      filtered_properties = properties.filter(
        (property) => property.hostId != user_id
      );
    });
    for (let i = 0; i < filtered_properties.length; i++) {
      documents.push({ id : String(filtered_properties[i]._id), content : filtered_properties[i].description });
    }
    recommender.train(documents);
    var filtered_booking = [];
    Booking.find().then((bookings) => {
      filtered_booking = bookings.filter((booking) => booking.renter_id == user_id);
    });
    if(filtered_booking.length == 0){
      res.send([]);
    }
    const similarDocuments = recommender.getSimilarDocuments(filtered_booking[filtered_booking.length - 1].property_id, 0, 5);
    const similar_properties = [];
    for (let i = 0; i < similarDocuments.length; i++) {
      similar_properties.push(properties.findById(similarDocuments[i].id));
    }
    res.send(similar_properties);
  })
);

module.exports = router;
