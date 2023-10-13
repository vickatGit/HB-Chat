import express from "express";
import { dbConnect } from "./config/db_connection";
const path = require("path");
import { Server } from "socket.io";
import http from "http";
dbConnect();
const app: express.Application = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);

const { 
    AddMessageController,
    CreateRoomController
 } = require("./controller/ChatController");

app.use(express.json());

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("CREATE_ROOM",async(members:any, admin: String, roomName: String) => {
    const mem:Array<String> = JSON.parse(members)
    await CreateRoomController(mem, admin, roomName)
  });

  socket.on("msg", (data) => {
    // AddMessageController()
  });
});

app.use(express.static(path.resolve("D:/VS code/chat/public")));

app.get("/", (req, res) => {
  return res.sendFile("D:/VS code/chat/public/index.html");
});
server.listen(8085, () => {
  console.log("listening on port : 3000");
});
