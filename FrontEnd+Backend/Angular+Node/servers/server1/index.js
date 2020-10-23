const { setInterval } = require('timers');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 1234;

app.use(bodyParser.json());
// app.use(express.static(process.cwd()+"/location-dashboard/dist/location-dashboard/"));

app.get('/', (req, res) => {
    res.send(`<h1>Socket running at port ${PORT}</h1>`);
});

function calculateLocation(location) {
    const dx = parseFloat(((0.5 - Math.random())*0.001).toFixed(4));
    const dy = parseFloat(((0.5 - Math.random())*0.001).toFixed(4));
    location.initial_latitude = location.initial_latitude + dx;
    location.initial_longitude = location.initial_longitude + dy;
    location.timestamp = new Date();
    return location
}

function locationUpdate(socket, location) {
    setInterval(() => {
        socket.emit('my broadcast', location);
        location = {...calculateLocation(location)}
    },2000);
}

io.on('connection', socket => {
    console.log('a client connected');
    const location = {
        initial_latitude : 48.8581824,
        initial_longitude : 2.212730400000055,
        timestamp: new Date()
    };
    locationUpdate(socket, location);
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

http.listen(PORT, () => {
    console.log('listening on port '+ PORT);
});