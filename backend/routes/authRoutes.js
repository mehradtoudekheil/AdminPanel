const express = require('express');
const router = express.Router();
const { register, login, refreshToken, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('name')
    .notEmpty().withMessage('نام الزامی است')
    .isLength({ min: 2 }).withMessage('نام باید حداقل ۲ کاراکتر باشد'),
  body('email')
    .notEmpty().withMessage('ایمیل الزامی است')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage('ایمیل معتبر نیست'),
  body('password')
    .notEmpty().withMessage('پسورد الزامی است')
    .isLength({ min: 8 }).withMessage('پسورد باید حداقل ۸ کاراکتر باشد')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('پسورد باید شامل حرف کوچک، حرف بزرگ، عدد و علامت باشد'),
];

const loginValidation = [
  body('email')
    .notEmpty().withMessage('ایمیل الزامی است')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage('ایمیل معتبر نیست'),
  body('password')
    .notEmpty().withMessage('پسورد الزامی است'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: احراز هویت
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: ثبت نام کاربر جدید
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: مهراد
 *               email:
 *                 type: string
 *                 example: mehrad@test.com
 *               password:
 *                 type: string
 *                 example: Mehrad@123
 *     responses:
 *       201:
 *         description: ثبت نام موفق
 *       400:
 *         description: ایمیل قبلاً ثبت شده یا validation error
 */
router.post('/register', registerValidation, validate, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: ورود کاربر
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: mehrad@test.com
 *               password:
 *                 type: string
 *                 example: Mehrad@123
 *     responses:
 *       200:
 *         description: ورود موفق و دریافت توکن
 *       401:
 *         description: ایمیل یا پسورد اشتباه
 */
router.post('/login', loginValidation, validate, login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: دریافت access token جدید
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: your_refresh_token
 *     responses:
 *       200:
 *         description: access token جدید
 *       401:
 *         description: refresh token معتبر نیست
 */
router.post('/refresh', refreshToken);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: خروج از حساب
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: خروج موفق
 */
router.post('/logout', protect, logout);

module.exports = router;