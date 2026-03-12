const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
    type:String,
    required:true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message:'Stock must be an integer'
      }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
    }, 
  {
    timestamps: true 
  }
)
module.exports = mongoose.model('Product', productSchema);