const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const apiRouter = require('./routes/api_route');

const {
  DB_HOST: db_host,
  DB_NAME: db_name,
  API_BASE_URL: api_base_url
} = process.env;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(`mongodb://${db_host}/${db_name}`,{useNewUrlParser: true,useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('connected', function() {
  console.log('Database connected successfully');
});

db.on('error', function(err) {
  console.log('Error occured during database connection');
});

app.use(api_base_url, apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

if (process.env.NODE_ENV === "production") {
  // Do not send stack trace of error message when in production
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Error occurred while handling the request.");
  });
} else {
  // Log stack trace of error message while in development
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.send(err.message);
  });
}

module.exports = app;
