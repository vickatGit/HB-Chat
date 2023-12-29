"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatController_1 = require("../controller/ChatController");
const router = (0, express_1.Router)();
router.route('/rooms/:userId').get(ChatController_1.GetRoomsController);
router.route('/chats/:roomId').get(ChatController_1.GetChatsController);
exports.default = router;
