exports.index = (req, res) => {
  res.render('dashboard/index', {
    title: 'Dashboard',
    name: 'Sohail Khan',
  });
};

exports.sheet = (req, res) => {
  res.render('dashboard/sheet', {
    title: 'Sheet View',
    name: 'Sohail Khan',
  });
};
