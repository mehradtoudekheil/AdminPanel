const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'خطای سرور';

  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'آیتم پیدا نشد';
  }

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} قبلاً ثبت شده`;
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'توکن معتبر نیست';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'توکن منقضی شده، لطفاً دوباره لاگین کنید';
  }

  // فقط خطاهای ۵۰۰ رو لاگ کن
  if (statusCode === 500) {
    logger.error({
      message: err.message,
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
      user: req.user ? req.user._id : 'مهمان',
      timestamp: new Date().toISOString(),
    });
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;