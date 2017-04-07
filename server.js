'use strict';

import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'
import compress from 'compression'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import methodOverride from 'method-override'// NOTE - not using -

// NOTE - user import
import config from './config/';

 // NOTE - Middleware to secure Express.js applications
import path from 'path'
// NOTE - Main App

const app = express()

// NOTE - Set
app.set('view engine','ejs')
app.set('view',path.join(config.root,'views'))

// NOTE - Use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(logger('dev'));
app.use(express.static(path.join(config.root,'static')))
app.use(favicon(path.join(config.root, 'static/img/favicon.png')));

// NOTE - Use routes

// NOTE - catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// NOTE - general errors
app.use((err, req, res, next) => {
  const sc = err.status || 500;
  res.status(sc);
  res.render('error', {
    status: sc,
    message: err.message,
    stack: config.env === 'development' ? err.stack : ''
  });
});

// NOTE - Mongoose setup
// NOTE -  warn if MONGOURI is being used and pass is undefined
if (config.db === process.env.MONGOURI && !config.pass)
  console.log(`bad credientials for ${config.db} -- check env.`);
mongoose.connect(config.db, {
  user: config.user,
  pass: config.pass
});
const db = mongoose.connection;
db.on('error', () => {
  throw new Error(`unable to connect to database at ${config.db}`);
});

// START AND STOP
const server = app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});

process.on('SIGINT', () => {
  console.log('shutting down!');
  db.close();
  server.close();
  process.exit();
});
