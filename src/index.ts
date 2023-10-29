import express from "express";
import { dbConnect } from "./config/db_connection";
const path = require("path");
import { Server } from "socket.io";
import http from "http";
import Room from './models/Room'
import {config} from 'dotenv'
config()
dbConnect();
const app: express.Application = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);
import chatRoutes from './routes/ChatRoutes';

const { 
    AddMessageController,
    CreateRoomController
 } = require("./controller/ChatController");

app.use(express.json());
app.use('/chat/',chatRoutes)


io.on("connection", (socket) => {
  console.log("connection", socket.id);

  socket.on("CREATE_ROOM",async(members:any, admin, roomName: String, callback) => {
    const mem:Array<String> = JSON.parse(members)
    const data = await CreateRoomController(mem, admin, roomName)
    callback(data._id)
  });

  socket.on('JOIN_ROOM',(roomId) => { 
    socket.join(roomId) 
  })
  socket.on("SEND_MESSAGE", async(from,msg,msgType,mediaUrl,roomId) => {
    console.log("essag",msg,"--")
    socket.to(roomId).emit("RECEIVE_MESSAGE",msg,from)
    await AddMessageController(from,roomId,msgType,msg,mediaUrl)
  });
  socket.on('TYPING',(roomId,userName:String) => {
    console.log(`${userName} typiong for ${roomId}`)
    socket.to(roomId).emit('ON_TYPING',`${userName} typing....`)
  })
  socket.on('STOP_TYPING',(roomId) => {
    console.log(`stoped typing for ${roomId}`)
    socket.to(roomId).emit('STOP_TYPING','')
  })

  
    socket.on(`ONLINE_STATUS`,(isOnline,roomId) => {
      console.log(`user online ${isOnline} `)
      socket.to(roomId).emit(`ONLINE_STATUS`,isOnline)
    })
    socket.on("IS_FRIEND_ONLINE",(roomId) => {
      socket.to(roomId).emit("AM_I_ONLINE")
    })
    socket.on("AM_I_ONLINE",(roomId,isOnline) => {
      socket.to(roomId).emit("IS_FRIEND_ONLINE", isOnline)
    })

  
});

app.use(express.static(path.resolve("D:/VS code/chat/public")));

app.get("/", (req, res) => {
  return res.sendFile("D:/VS code/chat/public/index.html");
});
// const deleteRooms =async () => {
//   await Room.deleteMany({})
// }

server.listen(process.env.PORT, async() => {
  console.log("listening on port : 8085");
  // await deleteRooms()
  
});


