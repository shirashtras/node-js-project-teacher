const express = require('express');
const isAdmin=require('../middlewares/isAdmin')
const verifyJWT = require('../middlewares/verifyJWT')
const { deleteCategory } = require('../controllers/categoryController')
const router = express.Router()

router.delete('/:id',verifyJWT,isAdmin,deleteCategory)

module.exports = router
