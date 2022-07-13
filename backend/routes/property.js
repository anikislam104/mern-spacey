const router = require('express').Router();
let Property = require('../models/property');
const current_user_id = require('./users').current_user_id;



router.route('/').get((req, res) => {
  Property.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const hostId = req.body.host_id;
  const insuranceId = 1;
  const location = req.body.location;
  const description = req.body.description;
  const size = req.body.size;
  const status = 'Unoccupied';
  const pricePerDay = req.body.pricePerDay;

<<<<<<< HEAD
  console.log("hostId: " + hostId+" insuranceId: " + insuranceId+" location: " + location+" description: " + description+" size: " + size+" status: " + status+" pricePerDay: " + pricePerDay);

=======
  console.log(hostId);
  
>>>>>>> 91c2e4a83fdd00855311b0d0a086929271e7b3f9
  const newProperty = new Property({
    hostId,
    insuranceId,
    location,
    description,
    size,
    status,
    pricePerDay,
  });

  newProperty.save()
  .then(() => res.send('property added'))
  .catch(err => res.status(400).json('Error: ' + err));
  return;
});

module.exports = router;
