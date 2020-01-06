const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public'))); // IGNORE /public
app.use(cors());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/images")
//   },
//   filename: (req, file, cb) => {
//     let name = Date.now() + "-" + file.originalname
//     cb(null, name)
//   }
// });
// const upload = multer({ storage: storage });

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.post('/upload', upload.single("image"), (req, res, next) => {
//   console.log('req.file', req.file)
//   console.log('req.body', req.body)
//   let imageUrl = "http://localhost:3129/" + req.file.path.replace('public/', '')
//   res.json({
//     imageUrl: imageUrl,
//     message: "file uploaded"
//   })
// })

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
