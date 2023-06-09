require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors')

const taskRouter = require('./api/routes/tasks');

const app = express();

app.use(logger('dev'));
app.use(cors({
  origin: '*'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/tasks', taskRouter);

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
  res.json({error: err.message});
});

module.exports = app;
