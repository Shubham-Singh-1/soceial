# soceial
A complete social media website...with several fun features and with a detailed directory strcuture...

This is the well defined directory structure for the project
.
└── soceial-master
    ├── assets
    │   ├── css
    │   ├── js
    │   └── scss
    ├── config
    │   ├── chat_sockets.js
    │   ├── kue.js
    │   ├── middleware.js
    │   ├── mongoose.js
    │   ├── nodemailer.js
    │   ├── passport-google-oauth2-strategy.js
    │   ├── passport-jwt-statergy.js
    │   ├── passport-local-statergy.js
    │   └── view-helpers.js
    ├── controllers
    │   ├── api
    │   ├── comments_controller.js
    │   ├── home_controller.js
    │   ├── likes_controller.js
    │   ├── posts _controller.js
    │   └── users_controller.js
    ├── gulpfile.js
    ├── index.js
    ├── mailers
    │   └── comments_mailer.js
    ├── models
    │   ├── comment.js
    │   ├── friendship.js
    │   ├── like.js
    │   ├── post.js
    │   └── user.js
    ├── package.json
    ├── package-lock.json
    ├── production_logs
    │   └── access.log
    ├── public
    │   └── assets
    ├── README.md
    ├── rev-manifest.json
    ├── routes
    │   ├── api
    │   ├── comments.js
    │   ├── index.js
    │   ├── likes.js
    │   ├── posts.js
    │   └── users.js
    ├── uploads
    │   └── users
    ├── views
    │   ├── _chat_box.ejs
    │   ├── _comment.ejs
    │   ├── _footer.ejs
    │   ├── _header.ejs
    │   ├── home.ejs
    │   ├── layout.ejs
    │   ├── mailers
    │   ├── _post.ejs
    │   ├── user_controller.ejs
    │   ├── user_sign_in.ejs
    │   └── user_sign_up.ejs
    └── workers
        └── comment_email_worker.js
        
Feel free to Fork and run on **http://localhost:8000**

To Run just do **npm start**
