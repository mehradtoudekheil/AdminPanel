const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'نام محصول الزامی است'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'قیمت الزامی است'],
      min: [0, 'قیمت نمیتواند منفی باشد'],
    },
    stock: {
      type: Number,
      required: [true, 'موجودی الزامی است'],
      min: [0, 'موجودی نمیتواند منفی باشد'],
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'دسته‌بندی الزامی است'],
    },
    images: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);