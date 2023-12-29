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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetChatsController = exports.GetRoomsController = exports.CreateRoomController = exports.AddMessageController = void 0;
const chat_service_1 = require("../service/chat_service");
const AddMessageController = (from, to, msgType, msg, mediaUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, chat_service_1.AddTextMessageService)({
        from: from,
        toRoom: to,
        msgType: msgType,
        msg: msg,
        mediaUrl: mediaUrl
    });
    console.log("insertion", data);
});
exports.AddMessageController = AddMessageController;
const CreateRoomController = (members, admin, roomName) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("CreateRoomController", members.length);
    return yield (0, chat_service_1.CreateRoomService)(members, admin, roomName);
});
exports.CreateRoomController = CreateRoomController;
const GetRoomsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("userId", req.params.userId);
    const data = yield (0, chat_service_1.GetChatsService)(req.params.userId);
    res.status(200).send({
        data: data
    });
});
exports.GetRoomsController = GetRoomsController;
const GetChatsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, chat_service_1.GetMessages)(req.params.roomId);
    res.status(200).send({
        data: data
    });
});
exports.GetChatsController = GetChatsController;
