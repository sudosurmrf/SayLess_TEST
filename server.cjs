const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/v1', require('./api/index.cjs'));
app.use()

const server = http.createServer(app);

// TODO this origin needs to be changed to not be hard-coded
const io = new Server(server, {
  cors: {
    origin: "http://sayless.onrender.com", // this may be changed further, point being that this should be actual website url
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) =>{
  console.log('A user connected');

  socket.on("lobbysend", () =>{
    socket.emit("p1start");
    socket.broadcast.emit("p2wait");
  })

  socket.on("p1send", (data) => {
    socket.emit("p1wait");
    socket.broadcast.emit("p2start", { data });
  });

  socket.on("p2sendwin", (data) =>{
    io.emit("p2won", { data })
  })

  socket.on("p2sendlose", (data) =>{
    io.emit("p2lose", { data })
  })

  socket.on("playagain", () => {
    io.emit("backtolobby");
  });

  socket.on('disconnect',() => {
    console.log('user disconnected');
  });

});

app.get('/', (req, res, next) =>(
  res.sendFile(path.join(__dirname,'dist','index.html'))
));

app.get('*', (req, res, next) =>(
  res.sendFile(path.join(__dirname,'dist','index.html'))
));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening on port ${PORT}`)});


const SOCKET = process.env.SOCKET_PORT || 3001;
server.listen(SOCKET, () => {console.log(`listening on ${SOCKET}`)});