const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'این ایمیل قبلاً ثبت شده' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      darkMode: user.darkMode,
      token: generateAccessToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password +refreshToken');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'ایمیل یا پسورد اشتباه است' });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // ذخیره refresh token توی دیتابیس
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      darkMode: user.darkMode,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'refresh token الزامی است' });
    }

    // verify کردن refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // چک کردن توی دیتابیس
    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'refresh token معتبر نیست' });
    }

    // access token جدید
    const accessToken = generateAccessToken(user._id);

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: 'refresh token منقضی شده یا معتبر نیست' });
  }
};

const logout = async (req, res) => {
  try {
    // حذف refresh token از دیتابیس
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
    res.json({ message: 'خروج موفق' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, refreshToken, logout };