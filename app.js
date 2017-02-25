let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');

let index = require('./routes/index');
let menu = require('./routes/menu');
let ajax = require('./routes/ajax');

//middlewares
let chechAuth = require('./middleware/checkAuth');

global.onsenViewDirectory = 'onsen/';
global.uniqueViewDirectory = 'unique/';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
/*app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));*/
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/menu', [chechAuth], menu);
app.use('/ajax', ajax);

// catch 404 and forward to error handler
app.use((req, res, next) =>
{
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) =>
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, '192.168.0.4', () =>
{
    console.log('192.168.0.4:3000');
    console.log(process.platform);
});

module.exports = app;
