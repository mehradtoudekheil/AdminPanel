const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { body, validationResult } = require('express-validator');

const createValidation = [
  body('name')
    .notEmpty().withMessage('نام محصول الزامی است')
    .isLength({ min: 2 }).withMessage('نام باید حداقل ۲ کاراکتر باشد'),
  body('price')
    .notEmpty().withMessage('قیمت الزامی است')
    .isNumeric().withMessage('قیمت باید عدد باشد')
    .isFloat({ min: 0 }).withMessage('قیمت نمیتواند منفی باشد'),
  body('stock')
    .notEmpty().withMessage('موجودی الزامی است')
    .isNumeric().withMessage('موجودی باید عدد باشد')
    .isFloat({ min: 0 }).withMessage('موجودی نمیتواند منفی باشد'),
  body('category')
    .notEmpty().withMessage('دسته‌بندی الزامی است'),
];

const updateValidation = [
  body('name')
    .optional()
    .isLength({ min: 2 }).withMessage('نام باید حداقل ۲ کاراکتر باشد'),
  body('price')
    .optional()
    .isNumeric().withMessage('قیمت باید عدد باشد')
    .isFloat({ min: 0 }).withMessage('قیمت نمیتواند منفی باشد'),
  body('stock')
    .optional()
    .isNumeric().withMessage('موجودی باید عدد باشد')
    .isFloat({ min: 0 }).withMessage('موجودی نمیتواند منفی باشد'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, adminOnly, upload.array('images', 5), createValidation, validate, createProduct);
router.put('/:id', protect, adminOnly, upload.array('images', 5), updateValidation, validate, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;