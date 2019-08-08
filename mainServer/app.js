var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var routes = require('./routes');
var app = express();
var bodyParser = require('body-parser');

var joinRouter = require('./join');
var loginRouter = require('./login');
var wordRouter = require('./word');
var findRouter = require('./find');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('case sensitive routes', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(session({
    secret: 'asmltbiji',
    resave: false,
    saveUninitialized: false
}));

module.exports = app;

app.use('/joinServer', joinRouter);
app.use('/loginServer', loginRouter);
app.use('/wordServer', wordRouter);
app.use('/findServer', findRouter);

app.listen(8080, function () {
    console.log('CONNECT WITH CLIENT');
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    res.render(err.toString());
});
