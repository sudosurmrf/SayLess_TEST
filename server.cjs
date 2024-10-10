const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();


const allowedOrigins = ['http://localhost:3000', 'https://sayless.onrender.com', 'https://www.sayless.onrender.com', 'http://sayless.onrender.com', 'sayless:443','http://www.sayless.onrender.com'];

app.options('*', (req, res) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'OPTIONS', 'PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
  res.sendStatus(204);
});
app.use(cors({
  origin: function (origin, callback) {
    console.log('Request Origin:', origin);  

    if (!origin) return callback(null, true); 

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      console.error('Blocked Origin:', origin); 
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/v1', require('./api/index.cjs'));

const server = http.createServer(app);

// TODO this origin needs to be changed to not be hard-coded
const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // this may be changed further, point being that this should be actual website url
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) =>{
  console.log('A user connected');

  socket.on("lobbysend", () =>{
    console.log("Server is creating lobby")
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

app.get('*', (req, res, next) =>(
  res.sendFile(path.join(__dirname,'dist','index.html'))
));

const PORT = process.env.PORT || 3000; // Use port 443 for HTTPS by default

server.listen(PORT, () => {
  console.log(`HTTPS server and Socket.io are listening on port ${PORT}`);
});