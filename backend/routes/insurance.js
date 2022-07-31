const router = require('express').Router();
require('dotenv').config();
let Insurance = require('../models/insurance');
var current_insurance_id;




router.route('/').get((req, res) => {
    Insurance.find()
        .then(insurance => res.json(insurance))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
    const adderId = req.body.adder_id;
    const policy = req.body.policy;
    const status = 'active';
    const allInsurance = await Insurance.find();


    //.then(() => res.send('property added'))
    //.catch(err => res.status(400).json('Error: ' + err));

    for (let i = 0; i < allInsurance.length; i++) {
        current_insurance_id = allInsurance[i]._id;
    }

    if (current_insurance_id != undefined) {
        const filter = { _id: current_insurance_id };
        const updateDocument = {
            $set: {
                status: 'inactive',
            },
        };
        const result = await Insurance.updateOne(filter, updateDocument);
    }


    const newInsurance = new Insurance({
        adderId,
        policy,
        status,
    });

    await newInsurance.save();


    res.send('insurance added');
    return;
});

//get all properties
router.route('/all_insurance').get((req, res) => {
    Insurance.find()
        .then(insurances => {
            res.json(insurances);
        }
        )
})



module.exports = router;
