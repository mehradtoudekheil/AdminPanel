const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');
const { protect, superAdminOnly } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

const roleValidation = [
  body('role')
    .notEmpty().withMessage('نقش الزامی است')
    .isIn(['user', 'admin', 'superadmin']).withMessage('نقش معتبر نیست'),
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
 *   name: Users
 *   description: مدیریت کاربران (فقط سوپرادمین)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: لیست همه کاربرها
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست کاربرها
 *       403:
 *         description: فقط سوپرادمین دسترسی دارد
 */
router.get('/', protect, superAdminOnly, getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: جزئیات یه کاربر
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: جزئیات کاربر
 *       404:
 *         description: کاربر پیدا نشد
 */
router.get('/:id', protect, superAdminOnly, getUser);

/**
 * @swagger
 * /users/{id}/role:
 *   put:
 *     summary: تغییر نقش کاربر
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin, superadmin]
 *                 example: admin
 *     responses:
 *       200:
 *         description: نقش کاربر آپدیت شد
 *       404:
 *         description: کاربر پیدا نشد
 */
router.put('/:id/role', protect, superAdminOnly, roleValidation, validate, updateUserRole);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: حذف کاربر
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: کاربر حذف شد
 *       403:
 *         description: نمیتوان سوپرادمین را حذف کرد
 *       404:
 *         description: کاربر پیدا نشد
 */
router.delete('/:id', protect, superAdminOnly, deleteUser);

module.exports = router;