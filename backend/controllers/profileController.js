const User = require('../models/User');
const Order = require('../models/Order');
const { deleteFile } = require('../utils/fileHelper');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'کاربر پیدا نشد' });
    }

    if (user.role === 'user') {
      const orders = await Order.find({ user: req.user._id })
        .sort({ createdAt: -1 });
      return res.json({ user, orders });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, firstName, lastName, phone, address, darkMode } = req.body;

    const currentUser = await User.findById(req.user._id);

    const avatar = req.file ? req.file.filename : undefined;

    // اگه عکس جدید آپلود شده، عکس قدیمی رو حذف کن
    if (avatar && currentUser.avatar) {
      deleteFile(currentUser.avatar);
    }

    const updateData = {
      name,
      firstName,
      lastName,
      phone,
      address,
      darkMode,
    };

    if (avatar) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ message: 'پروفایل آپدیت شد', data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ message: 'پسورد فعلی اشتباه است' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'پسورد تغییر کرد' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile, updatePassword };