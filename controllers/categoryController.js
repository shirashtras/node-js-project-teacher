const Product=require('../models/Product')
const Category=require('../models/Category')

exports.deleteCategory=async(req, res,next) => {
    try {
        const products = await Product.find({ category: req.params.id })
        if(products.length > 0) {
            return res.status(400).json({message:'Cannot delete category with existing products'})
        }

        const category=await Category.findByIdAndDelete(req.params.id)
        if(!category){
            return res.status(404).json({message:'Category not found'})
          }
        res.json({message:'Category deleted successfully'})
    } catch (error) {
        next(error)
    } 
}

 