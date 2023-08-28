const express = require('express')
const mongoose = require('mongoose')
const items = require('./routes/index')
const newLocal = require('custom-env')
const bodyParser = require('body-parser');
const cors = require('cors')
const http = require('http');
const socketIO = require('socket.io');
const session = require('cookie-session');
const cookieParser = require("cookie-parser");

// const sessionConfig = {
//     secret: 'SecretKey', // A secret key for signing the session ID cookie
//     resave: false,             // Forces the session to be saved back to the session store
//     saveUninitialized: true,  // Forces a session that is "uninitialized" to be saved to the store
//     cookie: {
//         secure: false,
//         maxAge: 1000 * 60 * 60 * 24000
//     }  // If running on HTTPS, set secure to true
// }


newLocal.env(process.env.Node_ENV, './config')
mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, console.log("DB connected"));

// const path = require('path');
// const appDir = dirname(require.main.filename)

const app = express()
//app.use(express.static(path.join(appDir, 'forms')));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
//app.use(session(sessionConfig));
app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    userType: ''
}))
app.use(cookieParser())
app.use('/', items)



const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    socket.broadcast.emit('joined', 'aaa');

    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected', '');
    });

    socket.on('new message', (msg) => {
        io.emit('new message', msg);
    });
});

//app.set('view enjine','ejs')
server.listen(process.env.PORT, () => {
    console.log('Server started on port 8082');
})

