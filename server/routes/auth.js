require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const serviceSID = process.env.SERVICE_SID
const accountSID = process.env.ACCOINT_SID
const authToken = process.env.AUTH_TOCKEN
const client = require('twilio')(accountSID, authToken)
let mobileNumber

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

//verify mobile
router.post("/mobile", async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone: phone });
    mobileNumber = user.phone
    if (!user) {
      res.json("Mobile number not found");
    } else if (user.isBlocked === true) {
      res.json("You are blocked");
    } else {
    console.log('verify');
    console.log(phone);
    client.verify.v2
          .services(serviceSID)
          .verifications.create({
            to: `+91${phone}`,
            channel: 'sms'
          })
          .then((resp)=>{
            console.log('response', resp);
            res.json({resp})
          })
    }
  } catch (error) {
    res.send(error.status).json(error.message);
  }
});


//verify otp
router.post("/otp", async (req, res) => {
  try {
    const user = await User.findOne({ phone: mobileNumber });
    const { otp } = req.body;
    client.verify.v2
        .services(serviceSID)
        .verificationChecks.create({
          to:`+91${mobileNumber}`,
          code: otp
        })
        .then(async(resp)=>{
          if(resp.valid){
            res.status(200).json(user)
          }else{
            res.json("OTP is not correct");
          }
        })
  } catch (error) {
    res.send(error.status).json(error.message);
  }
});

module.exports = router;