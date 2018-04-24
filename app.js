let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let studentController = require('./app/controllers/student_controllers');
let memberController = require('./app/controllers/member_controller');

//required for passport
let ensure = require('connect-ensure-login');
let session = require('express-session');
let flash = require('connect-flash');

let passport = require('./app/config/passport');

let app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:'ilovenodejs'}));
app.use(passport.init());
app.use(passport.session());
app.use(flash());

//START Controller
app.get('/', memberController.index);
app.get('/index_login', memberController.index_login);

app.get('/login',memberController.login);
app.post('/login', passport.auth());
app.get('/profile', ensure.ensureLoggedIn() ,memberController.myProfile);
app.get('/logout', memberController.logout);

app.get('/inquirystudents', studentController.getAllStudents);
app.get('/student_detail/:nim', studentController.getStudent);

app.get('/new_student',studentController.saveStudentShowForm);
app.post('/save_student',studentController.saveStudent);

app.get('/update_student/:nim',studentController.updateStudentShowForm);
app.post('/update_student',studentController.updateStudent);

app.get('/delete_student/:nim', studentController.deleteStudent);
//END Controller

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
