const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (search) filter.email = { $regex: search, $options: 'i' };

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'کاربر پیدا نشد' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const allowedRoles = ['user', 'admin', 'superadmin'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'نقش معتبر نیست' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'کاربر پیدا نشد' });
    }

    res.json({ message: 'نقش کاربر آپدیت شد', data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'کاربر پیدا نشد' });
    }

    if (user.role === 'superadmin') {
      return res.status(403).json({ message: 'نمیتوان سوپرادمین را حذف کرد' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'کاربر حذف شد' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, getUser, updateUserRole, deleteUser };