const router = require('express').Router();
require('dotenv').config();
let User = require('../models/user');
const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
let path = require('path');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('ReallySecretKey');
// @ts-ignore
const { Auth } = require("two-step-auth");
const nodemailer = require('nodemailer');
const { text } = require('express');
var global_otp = "";
var current_user_id = 0;
var current_user_image = '';
var current_firstname = '';
var current_lastname = '';
var current_email = '';
var current_password = '';
var current_nid = 0;
var current_phone = 0;
var current_date_of_birth = new Date();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  }
  , filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

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


router.route('/add').post(upload.single("image"),async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const nidNumber = Number(req.body.nidNumber);
  const phoneNumber = Number(req.body.phoneNumber);
  const dateOfBirth = Date.parse(req.body.dateOfBirth);
  const image = req.file.originalname;
  // const image = Buffer.from(req.body.image);
  const encryptedPassword = cryptr.encrypt(password);

  //backup
  current_firstname = firstName;
  current_lastname = lastName;
  current_email = email;
  current_password = cryptr.encrypt(password);
  current_nid = nidNumber;
  current_phone = phoneNumber;
  current_date_of_birth = dateOfBirth;
  current_user_image = image;

  const allUsers=await User.find();
  let check=false;

  console.log(image);

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
    router.route('/signup_otp').post((req, res) => {
      const otp = req.body.otp;
        if(global_otp===otp && current_user_id===0){
          console.log("OTP verified");
          console.log("encrypted password: "+cryptr.decrypt(encryptedPassword));
          console.log("current_password: "+cryptr.decrypt(current_password));
          
          console.log("User added");
          const newUser = new User({
            firstName: current_firstname,
            lastName: current_lastname,
            email: current_email,
            password : current_password,
            nidNumber: current_nid,
            phoneNumber : current_phone,
            dateOfBirth : current_date_of_birth,
            image : current_user_image,
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
    if(allUsers[i].email===email && cryptr.decrypt(allUsers[i].password)===password && current_user_id==0){
      check=true;
      userIndex=i;
      console.log("user index "+userIndex);
      current_user_id=allUsers[i]._id;
      current_user_image=allUsers[i].image;
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


//get user name
router.route('/get_user_name').post(async (req, res) => {
  const user_id = req.body.host_id;
  User.find()
    .then(users => {
        users=users.filter(user=>user._id==user_id);
        res.json(users[0].firstName+" "+users[0].lastName);
    })
})

router.route('/user_id').get((req, res) => {
  console.log("current_user_id "+current_user_id);
  res.send({user_id:current_user_id,user_image:current_user_image});
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(User => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/logout').post((req, res) => {
    const id=req.body.user_id;
    current_user_id=0;
    res.send('logout');
  })

  module.exports = router;
  module.exports.current_user_id = current_user_id;