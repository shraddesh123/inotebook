const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

JWT_SECRETE = 'THUNDER'
// Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  //validate the name, email, and password fields.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json({ error: 'sorry username with this email already exist', message: user.message })
  }

  //it is known as hashing for the security of passwords 
  //we have used bcryptjs to gena\erate the hash password
  const salt = await bcrypt.genSalt(10);
  secPass = await bcrypt.hash(req.body.password, salt);
  user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email,
  })
  const data = {
    user:{
      id:user.id
    }
  }
  const authToken = jwt.sign(data, JWT_SECRETE);
  console.log(authToken);
  try {
    res.json(authToken);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred', message: err.message });
  }
  
})

module.exports = router