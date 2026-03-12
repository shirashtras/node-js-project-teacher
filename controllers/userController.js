const User = require('../models/User')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ err: "fields required" });
    }

    const user = await User.findOne({username });
    if (!user) {
      return res.status(401).json({ err: "user not found" });
    }
    const ifMatch = await bcrypt.compare(password, user.password);
    if (!ifMatch) {
      return res.status(401).json({ err: "user not found" });
    }
    const token = jwt.sign({id:user._id,role:user.role},process.env.ACCESS_TOKEN_SECRET)
    res.json({ message: "Login successful" ,token})
  } catch (error) {
    next(error)
  }
}

exports.userRegistration = async (req, res, next) => {
  try {
    const { username, password} = req.body;
    if(!username||!password)
      return res.status(400).json({message:"All fields are required"})

    const ifExistUser= await User.findOne({username })
    if(ifExistUser)
      return res.status(400).json({message:"user already exists"})

    const hashedPwd = await bcrypt.hash(password, 10)

    const newUser= await User.create({username,password:hashedPwd})
    res.status(201).json(newUser)
  }
    catch (error) {
      next(error)
    }
  }
 
  
    
