const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Sohail Khan',
    title: 'Home',
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    name: 'Sohail Khan',
    title: 'Login',
  });
});

app.get('/register', (req, res) => {
  res.render('register', {
    name: 'Sohail Khan',
    title: 'Register',
  });
});

app.listen(process.env.PORT || 8000);
