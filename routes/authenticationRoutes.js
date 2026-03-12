const express = require('express')
const { login,userRegistration } = require('../controllers/userController')
const router = express.Router()

router.post('/auth/login',login)
router.post('/auth/register',userRegistration)

module.exports = router