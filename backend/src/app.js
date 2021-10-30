const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); 
const routes = require('./routes');
const session = require('express-session');
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// console.log(__dirname );


app.use(session({
    secret: 's3cur3',
    resave: false,
    saveUninitialized: false
}));

app.use(routes);

module.exports = app;