const Product=require('../models/Product')
const fs = require('fs')

exports.createProduct=async(req, res,next) => {
    try {
        const product=await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}

exports.updateProduct=async(req, res,next) => {
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
      if(!product){
        return res.status(404).json({message:'Product not found'})
      }
      res.json(product)
    }catch(error){
        next(error)
    }
}
exports.deleteProduct=async(req, res,next) => {
    try{
       const product=await Product.findByIdAndUpdate(req.params.id,{isActive:false},{new:true}) 
        if(!product){
            return res.status(404).json({message:'Product not found'})
          }
          const messageToLog = `Product ${product._id} was soft deleted at ${new Date().toISOString()}\n`
          fs.appendFileSync('deleteProduct.log', messageToLog)

          res.json({message:'Product soft deleted',product})
    }catch(error){
        next(error)
    }
}

exports.findProductById=async(req, res,next) => {
    try{
        const product=await Product.findOne({_id:req.params.id,isActive:true})
        if(!product){
            return res.status(404).json({message:'Product not found'})
          }
        res.json(product)
    }catch(error){
        next(error)
    }
}
exports.findAllProducts=async(req, res,next) => {
    try{
        const products=await Product.find({isActive:true})
        res.json(products)
    }catch(error){
        next(error)
    }
}
