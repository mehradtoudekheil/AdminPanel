const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getMyOrders,
  getOrder,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

const orderValidation = [
  body('items')
    .isArray({ min: 1 }).withMessage('سبد خرید خالی است'),
  body('items.*.product')
    .notEmpty().withMessage('محصول الزامی است'),
  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('تعداد باید حداقل ۱ باشد'),
  body('shippingAddress.address')
    .notEmpty().withMessage('آدرس الزامی است'),
  body('shippingAddress.city')
    .notEmpty().withMessage('شهر الزامی است'),
  body('shippingAddress.postalCode')
    .notEmpty().withMessage('کد پستی الزامی است'),
];

const statusValidation = [
  body('status')
    .notEmpty().withMessage('وضعیت الزامی است')
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('وضعیت معتبر نیست'),
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
 *   name: Orders
 *   description: مدیریت سفارش‌ها
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: لیست همه سفارش‌ها
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست سفارش‌ها
 *       403:
 *         description: فقط ادمین دسترسی دارد
 */
router.get('/', protect, adminOnly, getOrders);

/**
 * @swagger
 * /orders/myorders:
 *   get:
 *     summary: سفارش‌های من
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست سفارش‌های کاربر
 */
router.get('/myorders', protect, getMyOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: جزئیات یه سفارش
 *     tags: [Orders]
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
 *         description: جزئیات سفارش
 *       404:
 *         description: سفارش پیدا نشد
 */
router.get('/:id', protect, getOrder);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: ثبت سفارش جدید
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - shippingAddress
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: id_محصول
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: خیابان ولیعصر
 *                   city:
 *                     type: string
 *                     example: تهران
 *                   postalCode:
 *                     type: string
 *                     example: 1234567890
 *     responses:
 *       201:
 *         description: سفارش ثبت شد
 *       400:
 *         description: موجودی کافی نیست
 */
router.post('/', protect, orderValidation, validate, createOrder);

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: تغییر وضعیت سفارش
 *     tags: [Orders]
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
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *                 example: processing
 *     responses:
 *       200:
 *         description: وضعیت سفارش آپدیت شد
 *       404:
 *         description: سفارش پیدا نشد
 */
router.put('/:id/status', protect, adminOnly, statusValidation, validate, updateOrderStatus);

module.exports = router;