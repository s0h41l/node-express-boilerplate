const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'm4g1c', resave: false, saveUninitialized: false,
}));

app.use('/auth', authRoutes);
app.use('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    isAuth: req.session.isAuth || false,
    name: req.session.name,
  });
});

mongoose.connect('mongodb+srv://sohail:987654321@cluster0-qngvp.mongodb.net/node_boiler_plate?retryWrites=true&w=majority').then((state) => {
  app.listen(process.env.PORT || 8000);
}).catch((err) => {
  console.log(err);
});
