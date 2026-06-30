const express = require('express');
const router = express.Router();
const { getLogs, clearLogs } = require('../controllers/logController');
const { protect, superAdminOnly } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: لاگ خطاها (فقط سوپرادمین)
 */

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: دریافت لاگ خطاها
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست لاگ‌ها
 *       403:
 *         description: فقط سوپرادمین دسترسی دارد
 */
router.get('/', protect, superAdminOnly, getLogs);

/**
 * @swagger
 * /logs:
 *   delete:
 *     summary: پاک کردن لاگ‌ها
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لاگ‌ها پاک شدند
 */
router.delete('/', protect, superAdminOnly, clearLogs);

module.exports = router;