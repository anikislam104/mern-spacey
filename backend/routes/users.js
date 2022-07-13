const router = require('express').Router();
require('dotenv').config();
const client=require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
let User = require('../models/user');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('ReallySecretKey');
// @ts-ignore
const { Auth } = require("two-step-auth");
const nodemailer = require('nodemailer');
const { text } = require('express');
var global_otp = "";
var current_user_id = 0;

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
    // if(res.success == false){
    //   return sendOTP(emailId);
    // }
    return String(res.OTP);
  } catch (error) {
    console.log(error);
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
  const encryptedPassword = cryptr.encrypt(password);
  const allUsers=await User.find();
  let check=false;

  console.log(allUsers.length);
  for(let i=0;i<allUsers.length;i++){
    if(allUsers[i].email===email || allUsers[i].nidNumber===nidNumber || allUsers[i].phoneNumber===phoneNumber){
      check=true;
    }
  }
  console.log(check);

  if(check===true){
    res.send('invalid');
    return;
  }
  else{
    var otp_sent = sendOTP(email);
    otp_sent.then((otp_s)=>{
      global_otp=otp_s;
      console.log(global_otp);
    })
    res.send('ok');
    router.route('/signup_otp').post(async (req, res) => {
      const otp = req.body.otp;
        if(global_otp===otp){
          console.log("OTP verified");
          
          
          console.log("User added");
          const newUser = new User({
            firstName,
            lastName,
            email,
            password : encryptedPassword,
            nidNumber,
            phoneNumber,
            dateOfBirth,
          });

          
          newUser.save()
          .then(() => res.send('signup'))
          .catch(err => res.status(400).json('Error: ' + err));
          return;
          
        }
        else{
          console.log("OTP not verified");
          res.send('invalid');
        }
    });
  }
  
});


router.route('/login').post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var userIndex=-1;
  const allUsers=await User.find();
  let check=false;
  // let hashed_password = await bcrypt.hash(password, 10);

  for(let i=0;i<allUsers.length;i++){
    if(allUsers[i].email===email && cryptr.decrypt(allUsers[i].password)===password){
      check=true;
      userIndex=i;
      console.log("user index "+userIndex);
      current_user_id=allUsers[i]._id;
      break;
    }
     
  }
  // sendSMS(allUsers[userIndex].phoneNumber);
  
  console.log("check :"+check);
  if(check===true){
    let otp_sent = sendOTP(email);
    otp_sent.then((otp_s) => {
      console.log("otp_s "+otp_s);
      global_otp=otp_s;
    })
    res.send('ok');
    router.route('/login_otp').post(async (req, res) => {
      const otp = req.body.otp;
      console.log(otp);
        console.log("global_otp "+global_otp);
        if(global_otp===otp){
          console.log("OTP verified");
          // current_user_id=allUsers[userIndex]._id;
          // console.log("current_user_id login"+current_user_id);
          res.send('login');
        }
        else{
          console.log("OTP not verified");
          res.send('invalid');
        }
      
      
    })
    return;
  
  }
  else{
    res.send('invalid');
    return;
  }
});


router.route('/user_id').get((req, res) => {
  console.log("current_user_id "+current_user_id);
  res.send({user_id:current_user_id});
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(User => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;