const express = require('express');
const app = express();
const port = 2000;

// use express router
app.use('/' , require('./routes/index'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views' , './views');

app.listen(port , (err) => {
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});