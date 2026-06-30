const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  updatePassword,
} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { body, validationResult } = require('express-validator');

const passwordValidation = [
  body('currentPassword')
    .notEmpty().withMessage('پسورد فعلی الزامی است'),
  body('newPassword')
    .notEmpty().withMessage('پسورد جدید الزامی است')
    .isLength({ min: 8 }).withMessage('پسورد باید حداقل ۸ کاراکتر باشد')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('پسورد باید شامل حرف کوچک، حرف بزرگ، عدد و علامت باشد'),
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
 *   name: Profile
 *   description: مدیریت پروفایل کاربر
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: دیدن پروفایل
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: اطلاعات پروفایل
 *       401:
 *         description: لطفاً لاگین کنید
 */
router.get('/', protect, getProfile);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: آپدیت پروفایل
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: مهراد
 *               firstName:
 *                 type: string
 *                 example: مهراد
 *               lastName:
 *                 type: string
 *                 example: احمدی
 *               phone:
 *                 type: string
 *                 example: 09123456789
 *               darkMode:
 *                 type: boolean
 *                 example: true
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: پروفایل آپدیت شد
 */
router.put('/', protect, upload.single('avatar'), updateProfile);

/**
 * @swagger
 * /profile/password:
 *   put:
 *     summary: تغییر پسورد
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: Mehrad@123
 *               newPassword:
 *                 type: string
 *                 example: Mehrad@1234
 *     responses:
 *       200:
 *         description: پسورد تغییر کرد
 *       401:
 *         description: پسورد فعلی اشتباه است
 */
router.put('/password', protect, passwordValidation, validate, updatePassword);

module.exports = router;