const express = require('express');
const { login, register, logOut } = require('../controllers/auth');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    isAuth: req.session.isAuth || false,
    name: req.session.name,
  });
});

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register',
    isAuth: req.session.isAuth || false,
    name: req.session.name,
  });
});

router.post('/register', register);
router.post('/login', login);
router.get('/logOut', logOut);

module.exports = router;
