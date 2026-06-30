const rateLimit = require('express-rate-limit');

// محدودیت کلی
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقیقه
  max: 100,
  message: { message: 'درخواست‌های زیادی ارسال کردید، لطفاً بعداً تلاش کنید' },
});

// محدودیت برای auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقیقه
  max: 10,
  message: { message: 'تعداد تلاش‌های ورود بیش از حد مجاز است، لطفاً بعداً تلاش کنید' },
});

module.exports = { globalLimiter, authLimiter };