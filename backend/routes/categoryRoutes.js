const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  getChildren,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

const categoryValidation = [
  body('name')
    .notEmpty().withMessage('نام دسته‌بندی الزامی است')
    .isLength({ min: 2 }).withMessage('نام باید حداقل ۲ کاراکتر باشد'),
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
 *   name: Categories
 *   description: مدیریت دسته‌بندی‌ها
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: لیست همه دسته‌بندی‌ها
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: لیست دسته‌بندی‌ها
 */
router.get('/', getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: جزئیات یه دسته‌بندی
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: جزئیات دسته‌بندی
 *       404:
 *         description: دسته‌بندی پیدا نشد
 */
router.get('/:id', getCategory);

/**
 * @swagger
 * /categories/{id}/children:
 *   get:
 *     summary: زیردسته‌های یه دسته‌بندی
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: لیست زیردسته‌ها
 */
router.get('/:id/children', getChildren);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: ساخت دسته‌بندی جدید
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: الکترونیک
 *               description:
 *                 type: string
 *                 example: محصولات الکترونیکی
 *               parent:
 *                 type: string
 *                 example: id_دسته_والد
 *     responses:
 *       201:
 *         description: دسته‌بندی ساخته شد
 *       403:
 *         description: دسترسی ندارید
 */
router.post('/', protect, adminOnly, categoryValidation, validate, createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: آپدیت دسته‌بندی
 *     tags: [Categories]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: الکترونیک
 *               description:
 *                 type: string
 *                 example: محصولات الکترونیکی
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               parent:
 *                 type: string
 *                 example: id_دسته_والد
 *     responses:
 *       200:
 *         description: دسته‌بندی آپدیت شد
 *       404:
 *         description: دسته‌بندی پیدا نشد
 */
router.put('/:id', protect, adminOnly, categoryValidation, validate, updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: حذف دسته‌بندی
 *     tags: [Categories]
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
 *         description: دسته‌بندی حذف شد
 *       400:
 *         description: ابتدا زیردسته‌ها را حذف کنید
 *       404:
 *         description: دسته‌بندی پیدا نشد
 */
router.delete('/:id', protect, adminOnly, deleteCategory);

module.exports = router;