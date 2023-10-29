"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connection_1 = require("./config/db_connection");
const path = require("path");
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
(0, db_connection_1.dbConnect)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const ChatRoutes_1 = __importDefault(require("./routes/ChatRoutes"));
const { AddMessageController, CreateRoomController } = require("./controller/ChatController");
app.use(express_1.default.json());
app.use('/chat/', ChatRoutes_1.default);
io.on("connection", (socket) => {
    console.log("connection", socket.id);
    socket.on("CREATE_ROOM", (members, admin, roomName, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const mem = JSON.parse(members);
        const data = yield CreateRoomController(mem, admin, roomName);
        callback(data._id);
    }));
    socket.on('JOIN_ROOM', (roomId) => {
        socket.join(roomId);
    });
    socket.on("SEND_MESSAGE", (from, msg, msgType, mediaUrl, roomId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("essag", msg, "--");
        socket.to(roomId).emit("RECEIVE_MESSAGE", msg, from);
        yield AddMessageController(from, roomId, msgType, msg, mediaUrl);
    }));
    socket.on('TYPING', (roomId, userName) => {
        console.log(`${userName} typiong for ${roomId}`);
        socket.to(roomId).emit('ON_TYPING', `${userName} typing....`);
    });
    socket.on('STOP_TYPING', (roomId) => {
        console.log(`stoped typing for ${roomId}`);
        socket.to(roomId).emit('STOP_TYPING', '');
    });
    socket.on(`ONLINE_STATUS`, (isOnline, roomId) => {
        console.log(`user online ${isOnline} `);
        socket.to(roomId).emit(`ONLINE_STATUS`, isOnline);
    });
    socket.on("IS_FRIEND_ONLINE", (roomId) => {
        socket.to(roomId).emit("AM_I_ONLINE");
    });
    socket.on("AM_I_ONLINE", (roomId, isOnline) => {
        socket.to(roomId).emit("IS_FRIEND_ONLINE", isOnline);
    });
});
app.use(express_1.default.static(path.resolve("D:/VS code/chat/public")));
app.get("/", (req, res) => {
    return res.sendFile("D:/VS code/chat/public/index.html");
});
// const deleteRooms =async () => {
//   await Room.deleteMany({})
// }
server.listen(8085, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("listening on port : 8085");
    // await deleteRooms()
}));
