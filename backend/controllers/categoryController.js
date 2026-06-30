const Category = require('../models/Category');

// @route   GET /api/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parent', 'name');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/categories/:id
const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('parent', 'name');
    if (!category) {
      return res.status(404).json({ message: 'دسته‌بندی پیدا نشد' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/categories/:id/children
const getChildren = async (req, res) => {
  try {
    const children = await Category.find({ parent: req.params.id }).populate('parent', 'name');
    res.json(children);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/categories
const createCategory = async (req, res) => {
  try {
    const { name, description, parent } = req.body;

    // اگه parent داده شده چک کن وجود داره؟
    if (parent) {
      const parentExists = await Category.findById(parent);
      if (!parentExists) {
        return res.status(404).json({ message: 'دسته‌بندی والد پیدا نشد' });
      }
    }

    const category = await Category.create({ name, description, parent: parent || null });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/categories/:id
const updateCategory = async (req, res) => {
  try {
    const { name, description, isActive, parent } = req.body;

    // نمیتونه parent خودش باشه
    if (parent && parent === req.params.id) {
      return res.status(400).json({ message: 'دسته‌بندی نمیتواند والد خودش باشد' });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, isActive, parent: parent || null },
      { new: true, runValidators: true }
    ).populate('parent', 'name');

    if (!category) {
      return res.status(404).json({ message: 'دسته‌بندی پیدا نشد' });
    }

    res.json({ message: 'دسته‌بندی آپدیت شد', data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/categories/:id
const deleteCategory = async (req, res) => {
  try {
    // چک کن زیردسته داره؟
    const hasChildren = await Category.findOne({ parent: req.params.id });
    if (hasChildren) {
      return res.status(400).json({ message: 'ابتدا زیردسته‌ها را حذف کنید' });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'دسته‌بندی پیدا نشد' });
    }

    res.json({ message: 'دسته‌بندی حذف شد' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  getChildren,
  createCategory,
  updateCategory,
  deleteCategory,
};