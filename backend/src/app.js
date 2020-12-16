const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);





module.exports = app;