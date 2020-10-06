const becrypt = require('bcryptjs');
const User = require('../models/user');

const saltRounds = 10; // salt rounds for brcypt

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    User.findOne({ email })
      .then((usr) => {
        if (usr) {
          res.render('register', {
            title: 'Register',
            isAuth: req.session.isAuth,
            name: req.session.name,
            error: 'Email already exist!',
          });
        }

        becrypt.hash(password, saltRounds).then((hash) => {
          const user = new User({
            name,
            email,
            password: hash,
          });
          user.save().then((_usr) => {
            req.session.isAuth = true;
            req.session.name = _usr.name;
            req.session.userId = _usr._id.toString();
            res.render('login', {
              title: 'Home',
              isAuth: req.session.isAuth,
              name: req.session.name,
            });
          });
        });
      })
      .catch((err) => {
        res.render('register', {
          title: 'Register',
          isAuth: req.session.isAuth,
          name: req.session.name,
          error: err,
        });
      });
  } catch (err) {
    res.render('register', {
      title: 'Register',
      isAuth: req.session.isAuth,
      name: req.session.name,
      error: err,
    });
  }
};

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
      if (!user) {
        res.render('register', {
          title: 'Register',
          isAuth: req.session.isAuth,
          name: req.session.name,
          error: 'User not exist with this email!',
        });
      }
      becrypt.compare(password, user.password).then((isEqual) => {
        if (isEqual) {
          req.session.isAuth = true;
          req.session.name = user.name;
          req.session.userId = user._id.toString();
          res.render('index', {
            title: 'Home',
            isAuth: req.session.isAuth,
            name: req.session.name,
          });
        } else {
          req.session.isAuth = false;
          req.session.name = '';
          res.render('login', {
            title: 'Login',
            isAuth: req.session.isAuth,
            name: req.session.name,
            error: 'Password error!',
          });
        }
      });
    })
      .catch((err) => {
        res.render('login', {
          title: 'Login',
          isAuth: req.session.isAuth,
          name: req.session.name,
          error: err,
        });
      });
  } catch (err) {
    res.render('login', {
      title: 'Login',
      isAuth: req.session.isAuth,
      name: req.session.name,
      error: err,
    });
  }
};

exports.logOut = (req, res) => {
  req.session.isAuth = false;
  req.session.name = '';
  req.session.userId = '';
  res.render('index', {
    title: 'Home',
    isAuth: req.session.isAuth,
    name: req.session.name,
  });
};
