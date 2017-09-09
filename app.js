var express = require('express');
var path = require('path');

var index = require('./routes/index');
var users = require('./routes/users');
var usersObservables = require('./routes/usersObservables');
var usersAsyncAwait = require('./routes/usersAsyncAwait');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//router should be case sensitive and strict
app.enable('case sensitive routing');
app.enable('strict routing');

//should run fluently behind a proxy w/o revealing framework name to clients
app.set('x-powered-by',false);
app.set('trust proxy',true);
app.set('view cache',true);

app.use('/', index);
app.use('/users', users);
app.use('/usersObservables', usersObservables);
app.use('/usersAsyncAwait', usersAsyncAwait);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(3000);
console.log("Server has started on port 3000");

module.exports = app;
