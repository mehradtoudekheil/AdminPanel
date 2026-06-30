const Product = require('../models/Product');
const Category = require('../models/Category');
const { deleteFiles } = require('../utils/fileHelper');

const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate('category', 'name')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: 'محصول پیدا نشد' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'دسته‌بندی پیدا نشد' });
    }

    const images = req.files ? req.files.map((file) => file.filename) : [];

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, isActive } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'محصول پیدا نشد' });
    }

    const newImages = req.files ? req.files.map((file) => file.filename) : [];

    if (newImages.length > 0) {
      deleteFiles(product.images);
    }

    const images = newImages.length > 0 ? newImages : product.images;

    const updateData = { images };
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (category !== undefined) updateData.category = category;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name');

    res.json({ message: 'محصول آپدیت شد', data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'محصول پیدا نشد' });
    }

    // حذف همه عکس‌ها
    deleteFiles(product.images);

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'محصول حذف شد' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};