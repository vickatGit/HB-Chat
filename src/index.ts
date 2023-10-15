import express from "express";
import { dbConnect } from "./config/db_connection";
const path = require("path");
import { Server } from "socket.io";
import http from "http";
import Room from './models/Room'
dbConnect();
const app: express.Application = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);
import chatRoutes from './routes/ChatRoutes'

const { 
    AddMessageController,
    CreateRoomController
 } = require("./controller/ChatController");

app.use(express.json());
app.use('/chat/',chatRoutes)


io.on("connection", (socket) => {
  console.log("connection", socket.id);

  socket.on("CREATE_ROOM",async(members:any, admin: String, roomName: String) => {
    const mem:Array<String> = JSON.parse(members)
    await CreateRoomController(mem, admin, roomName)
  });

  socket.on('JOIN_ROOM',(roomId) => { socket.join(roomId) })
  socket.on("SEND_MESSAGE", (from,to,msg,msgType,mediaUrl,roomId) => {
    console.log("essag",msg,"--")
    AddMessageController(from,to,msgType,msg,mediaUrl)
    socket.to(roomId).emit("RECEIVE_MESSAGE",msg,from,to)
  });
});

app.use(express.static(path.resolve("D:/VS code/chat/public")));

app.get("/", (req, res) => {
  return res.sendFile("D:/VS code/chat/public/index.html");
});
// const deleteRooms =async () => {
//   await Room.deleteMany({})
// }
server.listen(8085, async() => {
  console.log("listening on port : 3000");
  // await deleteRooms()
  
});


