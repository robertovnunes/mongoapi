const express = require('express');
const bodyParser = require('body-parser');
const connectDatabase = require('./database');

const app = express();

connectDatabase();

app.use(bodyParser.json());

module.exports = app;

