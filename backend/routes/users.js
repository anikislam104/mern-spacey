const router = require('express').Router();
require('dotenv').config();
let User = require('../models/user');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
let path = require('path');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('ReallySecretKey');
const generateToken=require('../config/generateToken');
const OTP = require('../models/otp');
// @ts-ignore
const { Auth } = require("two-step-auth");

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
var current_user_type = '';
var fpEmail='';
var fpPassword='';

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


// router.route('/add').post(upload.single("image"),async (req, res) => {
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const email = req.body.email;
//   const password = req.body.password;
//   const nidNumber = Number(req.body.nidNumber);
//   const phoneNumber = Number(req.body.phoneNumber);
//   const dateOfBirth = Date.parse(req.body.dateOfBirth);
//   const user_type = req.body.user_type;
//   const image = req.file.originalname;
//   // const image = Buffer.from(req.body.image);
//   const encryptedPassword = cryptr.encrypt(password);

//   //backup
//   current_firstname = firstName;
//   current_lastname = lastName;
//   current_email = email;
//   current_password = cryptr.encrypt(password);
//   current_nid = nidNumber;
//   current_phone = phoneNumber;
//   current_date_of_birth = dateOfBirth;
//   current_user_image = image;
//   current_user_type = user_type;

//   const allUsers=await User.find();
//   let check=false;

//   console.log(image);

//   console.log(allUsers.length);
//   for(let i=0;i<allUsers.length;i++){
//     console.log(allUsers[i].email);
//     if(allUsers[i].email===email || allUsers[i].nidNumber===nidNumber || allUsers[i].phoneNumber===phoneNumber){
//       check=true;
//     }
//   }
//   console.log(check);

//   if(check===true){
//     res.send('invalid');
//     return;
//   }
//   else{
//     var otp_sent = sendOTP(email);
//     otp_sent.then((otp_s)=>{
//       global_otp=otp_s;
//       console.log(global_otp);
//     })
//     res.send('ok');
//     router.route('/signup_otp').post((req, res) => {
//       const otp = req.body.otp;
//         if(global_otp===otp && current_user_id===0){
//           console.log("OTP verified");
//           console.log("encrypted password: "+cryptr.decrypt(encryptedPassword));
//           console.log("current_password: "+cryptr.decrypt(current_password));
          
//           console.log("User added");
//           const newUser = new User({
//             firstName: current_firstname,
//             lastName: current_lastname,
//             email: current_email,
//             password : current_password,
//             user_type: current_user_type,
//             nidNumber: current_nid,
//             phoneNumber : current_phone,
//             dateOfBirth : current_date_of_birth,
//             image : current_user_image,
//           });

          
          
          
//             newUser.save();
//             //make json of new user
//             res.send(newUser); 

            
          
          
//         }
//         else{
//           console.log("OTP not verified");
//           res.send('invalid');
//         }
//     });
//   }
  
// });


// router.route('/login').post(async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const user_type = req.body.user_type;
//   var userIndex=-1;
//   const allUsers=await User.find();
//   let check=false;
//   console.log("user_type: "+user_type);
//   // let hashed_password = await bcrypt.hash(password, 10);

//   for(let i=0;i<allUsers.length;i++){
//     if(allUsers[i].email===email && cryptr.decrypt(allUsers[i].password)===password && allUsers[i].user_type===user_type){
//       check=true;
//       userIndex=i;
//       console.log("user index "+userIndex);
//       current_user_id=allUsers[i]._id;
//       current_user_image=allUsers[i].image;
//       break;
//     }
     
//   }
//   // sendSMS(allUsers[userIndex].phoneNumber);
  
//   console.log("check :"+check);
//   if(check===true){
//     let otp_sent = sendOTP(email);
//     otp_sent.then((otp_s) => {
//       console.log("otp_s "+otp_s);
//       global_otp=otp_s;
//     })
//     res.send('ok');
//     router.route('/login_otp').post(async (req, res) => {
//       const otp = req.body.otp;
//       console.log(otp);
//         console.log("global_otp "+global_otp);
//         if(global_otp===otp){
//           console.log("OTP verified");
//           // current_user_id=allUsers[userIndex]._id;
//           // console.log("current_user_id login"+current_user_id);
//           const user=await User.findById(current_user_id);
//           res.send(user);
//         }
//         else{
//           console.log("OTP not verified");
//           res.send('invalid');
//         }
      
      
//     })
//     return;
  
//   }
//   else{
//     res.send('invalid');
//     return;
//   }
// });


//get user name
router.route('/get_user_name').post(async (req, res) => {
  const user_id = req.body.user_id;
  User.find()
    .then(users => {
        users=users.filter(user=>user._id==user_id);
        res.json(users[0].firstName+" "+users[0].lastName);
    })
})

//forget password
router.route('/forget_password_otp_send').post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  fpEmail=email;
  fpPassword=password;

  let otp_sent = sendOTP(email);
    otp_sent.then((otp_s) => {
      console.log("otp_s "+otp_s);
      global_otp=otp_s;
  })
  res.send('ok');

})




router.route('/forget_password').post(async (req, res) => {
  const otp = req.body.otp;
  const encryptedPassword = cryptr.encrypt(fpPassword);
  console.log(fpPassword);
  const allUsers=await User.find();
  let otp_check=false;
  if(1===1){
    otp_check=true;
  }
  if(otp_check===false){
    res.send('invalid');
  }
  else{
    let email_check=false;
    for(let i=0;i<allUsers.length;i++){
      if(allUsers[i].email===fpEmail){
        email_check=true;
        allUsers[i].password=encryptedPassword;
        allUsers[i].save();
        break;
      }
    }
    if(email_check===true){
      res.send('ok');
    }
    else{
      res.send('invalid');
    }
}
})

router.route('/user_id').get((req, res) => {
  console.log("current_user_id "+current_user_id);
  res.send({user_id:current_user_id,user_image:current_user_image});
});


  
  router.route('/logout').post((req, res) => {
    const id=req.body.user_id;
    current_user_id=0;
    res.send('logout');
  });

  router.route('/jwtsignup').post(upload.single("image"),asyncHandler(async(req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const user_type = req.body.user_type;
    const nidNumber = req.body.nidNumber;
    const phoneNumber = req.body.phoneNumber;
    const dateOfBirth = req.body.dateOfBirth;
    const image = req.file.originalname;

    console.log("firstName: "+firstName);
    console.log("lastName: "+lastName);

    if(!firstName || !lastName || !email || !password || !user_type || !nidNumber || !phoneNumber || !dateOfBirth){
      res.send('invalid');
    }
    
    
    const user_exists = await User.findOne({email: email});

    if(user_exists){
      res.send('invalid');
    }
    else{
      const encryptedPassword = cryptr.encrypt(password);

      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: encryptedPassword,
        user_type: user_type,
        nidNumber: nidNumber,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        image: image
      });
      await newUser.save();
      console.log(newUser._id);
      res.send(
        {
          user_id: newUser._id,
          user_type: newUser.user_type,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          nidNumber: newUser.nidNumber,
          phoneNumber: newUser.phoneNumber,
          dateOfBirth: newUser.dateOfBirth,
          image: newUser.image,
          token: generateToken(newUser._id)
        }
      )
    }


  }));
  
  router.route('/jwtlogin').post(asyncHandler(async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user_type = req.body.user_type;

    if(!email || !password || !user_type){
      res.send('invalid');
    }

    const user = await User.findOne({email: email});
    const decryptedPassword = cryptr.decrypt(user.password);
    console.log(decryptedPassword+ " "+password);
    console.log(user_type+ " "+user.user_type);
    if(user){
      if(user.user_type === user_type && decryptedPassword === password){
        console.log("user_id "+user._id);
        res.send(
          {
            user_id: user._id,
            user_type: user.user_type,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            nidNumber: user.nidNumber,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            image: user.image,
            token: generateToken(user._id)
          }
        )
      }
        
      }
    }

    
  ));

  router.route('/getOTP').post(async(req, res) => {
    const user_id = req.body.user_id;
    const email = req.body.email;
    var otp=" ";
    console.log(user_id + " " + email);
    let otp_sent = sendOTP(email);
    console.log("otp_sent "+otp_sent);
    otp_sent.then(async (otp_s) => {
      console.log("otp_s "+otp_s);
      console.log("otp is "+otp);
      otp=otp_s;
      console.log("otp is "+otp);
      
      const user_exists=await OTP.findOne({user_id:user_id});
      if(user_exists){
        user_exists.otp=otp;
        user_exists.save();
        res.send(otp);
      }
      else{
        const newOTP = new OTP({
          user_id: user_id,
          otp: otp
        });
        newOTP.save();
        res.send(otp);
      }

    });
    console.log("otp "+otp);
    console.log("global_otp "+global_otp);
    
  });
  

  router.route('/deleteUser').post(asyncHandler(async(req, res) => {
    const user_id = req.body.user_id;
    User.find({_id: user_id}).deleteOne();

       
  }));

  //edit profile
  router.route('/editProfile').post(asyncHandler(async(req, res) => {
    const user_id = req.body.user_id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;

    console.log("user id "+user_id+" firstName: "+firstName+" lastName: "+lastName+" email: "+email+" password: "+password+" phoneNumber: "+phoneNumber);

    const user=await User.findOne({_id:user_id});

    if(firstName){
      user.firstName=firstName;
    }
    if(lastName){
      user.lastName=lastName;
    }
    if(email){
      user.email=email;
    }
    if(password){
      const encryptedPassword = cryptr.encrypt(password);
      user.password=encryptedPassword;
    }
    if(phoneNumber){
      user.phoneNumber=phoneNumber;
    }
    user.save();
    res.send(user);
  }));
  
  //get user details
  router.route('/getUserDetails').post(asyncHandler(async(req, res) => {
    const user_id = req.body.user_id;
    const user=await User.findOne({_id:user_id});
    console.log(user);
    res.send(user);
  }));

  module.exports = router;
  module.exports.current_user_id = current_user_id;