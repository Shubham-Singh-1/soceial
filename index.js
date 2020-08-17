const express = require('express');
const env = require('./config/environment');
const app =express();
const port = 3000;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocals = require('./config/passport-local-statergy');
const passportJWT = require('./config/passport-jwt-statergy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const { populate } = require('./models/user');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//set up the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening post 5000');
const path = require('path');


app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    debug:true,
    outputStyle:'extended',
    prefix:'/css',


}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

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
    secret: env.session_cookie_key,
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

app.use(flash());

app.use(customMware.setFlash);

// use express router
app.use('/' , require('./routes/index'));

app.listen(port , (err) => {
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});