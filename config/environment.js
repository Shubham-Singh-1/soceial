
const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'shubhamsinghnimbus2020@gmail.com',
            pass: '77501bhagatsarkaullualohomora'
        }
    },
    google_client_id:"887059710083-7qv01snhqch4l85vii07ekrdv88chs5s.apps.googleusercontent.com",
    google_client_secret:"V7BKN5nJHEdwinaT6FyGHwCG",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
}

const production = {
    name: 'production',
}

module.exports = development;