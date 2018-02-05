//TODO check html, sql, json protection for node
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');


loadGlobals();

//load routes
const index = require('./routes/index');
const menu = require('./routes/menu');
const ajax = require('./routes/ajax');

//load middlewares
const chechAuth = require('./middleware/checkAuth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.disable('x-powered-by');

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
  const err = new Error('Not Found');
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



module.exports = app;




function loadGlobals ()
{
    const globalDirectory = 'global';
    const globalFiles = fs.readdirSync(globalDirectory);
    for (const file of globalFiles)
    {
        if (file !== '.' && file !== '..')
        {
            const fileNameWithoutExtension = file.split('.')[0];
            global[fileNameWithoutExtension] = require(`./${globalDirectory}/${fileNameWithoutExtension}`);
        }
    }
}