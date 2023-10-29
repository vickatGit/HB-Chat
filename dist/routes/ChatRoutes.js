"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { AddMessageController, CreateRoomController, GetRoomsController, GetChatsController } = require("../controller/ChatController");
const router = (0, express_1.Router)();
router.route('/rooms/:userId').get(GetRoomsController);
router.route('/chats/:roomId').get(GetChatsController);
exports.default = router;
