const express = require('express');
const app =express();
const port = 8000;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocals = require('./config/passport-local-statergy');
const { populate } = require('./models/user');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract stypes and scripts from subpages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);


//set up the view engine
app.set('view engine', 'ejs');
app.set('views' , './views');


//mongo store is used to store session cookies in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment  in production mode
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie : {
        maxAge: (100*60*100),
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled',
    }, (err) => {
        console.log(err || 'connect mongoDB setup ok');
    })

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/' , require('./routes/index'));

app.listen(port , (err) => {
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});