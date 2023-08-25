const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//Register
router.post("/register", async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    //save user and send response
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username or password!");

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong username or password!");

    //send res
    res.status(200).json({_id: user._id, username: req.body.username})
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
