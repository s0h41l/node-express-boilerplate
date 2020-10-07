const { body } = require('express-validator');

exports.registerValidator = () => [
  body('name').not().isEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 7 }),
];

exports.loginValidator = () => [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 7 }),
];