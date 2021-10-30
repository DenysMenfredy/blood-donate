const path = require('path');
const app = require('./app');


require('dotenv').config();



app.listen(8080);

console.log('Server started on port 8080');