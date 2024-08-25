const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/api/v1', require('./api/index.cjs'));

const server = http.createServer(app);

// TODO this origin needs to be changed to not be hard-coded
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) =>{
  console.log('A user connected');

  socket.on("p1send", (data) => {
    io.emit("p1complete", { data });
  });

  socket.on("p2sendwin", (data) =>{
    io.emit("p2won", { data })
  })

  socket.on("p2sendlose", (data) =>{
    io.emit("p2lose", { data })
  })

  socket.on("playagain", () => {
    io.emit("resetgame");
  });

  socket.on('disconnect',() => {
    console.log('user disconnected');
  });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening on port ${PORT}`)});

// TODO need to adj;ust to not be hard coded later probably
server.listen(3001, () => {console.log(`listening on 3001`)});