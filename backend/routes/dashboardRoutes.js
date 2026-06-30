const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/dashboardController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: آمار و اطلاعات داشبورد
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: دریافت آمار داشبورد
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: آمار کامل داشبورد
 *       403:
 *         description: فقط ادمین دسترسی دارد
 */
router.get('/', protect, adminOnly, getDashboard);

module.exports = router;