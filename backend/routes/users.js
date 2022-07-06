const router = require('express').Router();
let User = require('../models/user');
const bcrypt = require("bcryptjs");
const { Auth,LoginCredentials } = require("two-step-auth");

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


async function sendOTP(emailId) {
  try {
    const res = await Auth(emailId);
    console.log(res);
    console.log(res.mail);
    console.log(res.OTP);
    console.log(res.success);
    return String(res.OTP);
  } catch (error) {
    return error;
  }
}


router.route('/add').post(async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const nidNumber = Number(req.body.nidNumber);
  const phoneNumber = Number(req.body.phoneNumber);
  const dateOfBirth = Date.parse(req.body.dateOfBirth);

  const allUsers=await User.find();
  let check=false;

  console.log(allUsers.length);
  for(let i=0;i<allUsers.length;i++){
    if(allUsers[i].email===email || allUsers[i].nidNumber===nidNumber || allUsers[i].phoneNumber===phoneNumber || nidNumber<1000000000 || nidNumber>9999999999){
      check=true;
    }
  }
  console.log(check);

  if(check===true){
    res.send('invalid');
    return;
  }
  const saltRounds = 10;
  let hashed_password = await bcrypt.hash(password, saltRounds);
  
  console.log("User added");
  const newUser = new User({
    firstName,
    lastName,
    email,
    password : hashed_password,
    nidNumber,
    phoneNumber,
    dateOfBirth,
  });

  
  newUser.save()
  .then(() => res.send('ok' ))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/login').post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const allUsers=await User.find();
  let check=false;
  var phoneNumber;

  // let hashed_password = await bcrypt.hash(password, 10);
  for(let i=0;i<allUsers.length;i++){
    if(allUsers[i].email===email && bcrypt.compare(password, allUsers[i].password)){
      check=true;
      phoneNumber=allUsers[i].phoneNumber;
    }
  }

  if(check===true){
    res.send('ok');
    const otp_sent = sendOTP(email);
    router.route('/otp').post(async (req, res) => {
      const otp = req.body.otp;
      otp_sent.then((otp_s) => {
        if(otp_s===otp){
          console.log("OTP verified");
          res.send('ok');
        }
        else{
          console.log("OTP not verified");
          res.send('invalid');
        }
      })
      
    })
    // async function sendOTP(emailId) {
    //   try {
    //     const res = await Auth(emailId);
    //     console.log(res);
    //     console.log(res.mail);
    //     console.log(res.OTP);
    //     console.log(res.success);
    //     return String(res.OTP);
    //   } catch (error) {
    //     return error;
    //   }
    // }
    // const otp=sendOTP("anikislampantha104@gmail.com"); 
    // console.log("hello");
    // console.log(String(otp));
    // const input_otp=res.get("otp");
    // console.log(input_otp);
    // if(input_otp===otp){
    //   console.log("OTP matched");
    //   res.send('otp_matched');
    // }
    // else{
    //   console.log("OTP not matched");
    //   res.send('invalid');
    // }
    return;
  
  }
  else{
    res.send('invalid');
    return;
  }
});



router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(User => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.nidNumber = Number(req.body.nidNumber);
        user.phoneNumber = Number(req.body.phoneNumber);
        user.dateOfBirth = Date.parse(req.body.dateOfBirth);


  
        user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;