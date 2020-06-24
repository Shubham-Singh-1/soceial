//require the library
const mongoose = require('mongoose');

//connect to the datbase
mongoose.connect('mongodb://localhost/codeial_developement', {useNewUrlParser: true});
// acquire the connection to check if it is successful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'Error connecting to mongoDB'));

// up and running then print the message
db.once('open', () => {
    console.log('Connected to database :: mongoDB');
});

module.exports = db;