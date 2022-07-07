const router = require('express').Router();
let User = require('../models/user');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('ReallySecretKey');
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
  const encryptedPassword = cryptr.encrypt(password);
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
  else{
    var otp_sent = sendOTP(email);
    res.send('ok');
    router.route('/otp').post(async (req, res) => {
      const otp = req.body.otp;
      otp_sent.then((otp_s) => {
        if(otp_s===otp){
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
      })
    });
  }
  
});


router.route('/login').post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const allUsers=await User.find();
  let check=false;
  // let hashed_password = await bcrypt.hash(password, 10);
  for(let i=0;i<allUsers.length;i++){
    if(allUsers[i].email===email && cryptr.decrypt(allUsers[i].password)===password){
      check=true;
      break;
    }
     
  }
  
  
  console.log("check :"+check);
  if(check===true){
    let otp_sent = sendOTP(email);
    otp_sent.then((otp_s) => {
      console.log("otp_s "+otp_s);
    })
    res.send('ok');
    router.route('/otp').post(async (req, res) => {
      const otp = req.body.otp;
      console.log(otp);
      otp_sent.then((otp_s) => {
        console.log("otp_s "+otp_s);
        if(otp_s===otp){
          console.log("OTP verified");
          res.send('login');
        }
        else{
          console.log("OTP not verified");
          res.send('invalid');
        }
      })
      
    })
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