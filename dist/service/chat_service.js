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
exports.GetChatsService = exports.GetMessages = exports.CreateRoomService = exports.AddTextMessageService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Message_1 = __importDefault(require("../models/Message"));
const Room_1 = __importDefault(require("../models/Room"));
// const MessageType  = require('../Types/MessageType')
function AddTextMessageService(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = new Message_1.default({
            from: msg.from,
            toRoom: msg.toRoom,
            msgType: msg.msgType,
            msg: msg.msg,
            mediaUrl: msg.mediaUrl
        });
        return yield message.save();
    });
}
exports.AddTextMessageService = AddTextMessageService;
function CreateRoomService(members, admin, roomName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("CreateRoomService", members);
        const users = [];
        for (let i = 0; i < members.length; i++) {
            console.log("id", members[i]);
            users.push(new mongoose_1.default.Types.ObjectId(`${members[i]}`));
        }
        const room = new Room_1.default({
            members: users,
            admin: new mongoose_1.default.Types.ObjectId(`${admin}`),
            roomName: roomName,
            roomType: (users.length == 2) ? "Personal" : "Group"
        });
        return yield room.save();
    });
}
exports.CreateRoomService = CreateRoomService;
function GetMessages(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Message_1.default.find({ toRoom: roomId });
    });
}
exports.GetMessages = GetMessages;
function GetChatsService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Room_1.default.find({ members: { $in: [userId] } })
            .populate({
            path: 'members',
            select: ["-password"]
        });
    });
}
exports.GetChatsService = GetChatsService;
