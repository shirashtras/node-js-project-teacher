const express = require('express')
const isAdmin=require('../middlewares/isAdmin')
const verifyJWT = require('../middlewares/verifyJWT')
const { createProduct, updateProduct,deleteProduct, findProductById, findAllProducts } = require('../controllers/productController')
const router = express.Router()

router.get('/:id',verifyJWT,findProductById)
router.get('/',verifyJWT,findAllProducts)

router.post('/',verifyJWT,isAdmin,createProduct)
router.put('/:id',verifyJWT,isAdmin,updateProduct)
router.delete('/:id',verifyJWT,isAdmin,deleteProduct)

module.exports = router;
