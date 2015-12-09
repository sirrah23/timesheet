var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var credentials = require('./credentials.js');
var Table = require('./models/tablemodel.js');
var mongoose = require('mongoose');

/*Database connection*/
mongoose.connect(`mongodb:/\/${credentials.username}:${credentials.password}@ds037824.mongolab.com:37824/timesheet`);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/viewarchive',function(req,res){
  var timesheets = [];
  Table.find({}, function(err, allTimesheets){
    allTimesheets.forEach(function(timesheet){
      timesheets.push(timesheet);
    });
    res.render('viewarchive',{title: 'Archive', data: timesheets});
  });
});

/*
 * Accept post request from archive
 * and post the table to the database
*/
app.post('/ajaxarchive',function(req,res){
  //use the table schema to create a new model
  console.log(req.body);
  var table = new Table({ table:req.body });
  var userAlertText = '';
  //set user alert depending on whether or not the database storage
  //was a success or a failure
  table.save(function(error,table){
    if (error){
      userAlertText = 'Could not store in database'; 
    }else{
      userAlertText = 'The table has been posted to the database!';
    }
    res.type('text/plain');
    res.write(userAlertText);
    res.end();
  });  
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
  message: err.message,
  error: {}
  });
});


module.exports = app;
