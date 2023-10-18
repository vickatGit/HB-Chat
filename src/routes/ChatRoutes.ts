import { Router } from "express";
const { 
    AddMessageController,
    CreateRoomController,
    GetRoomsController,
    GetChatsController
 } = require("../controller/ChatController");

const router = Router()

router.route('/rooms/:userId').get(GetRoomsController)
router.route('/chats/:roomId').get(GetChatsController)

export default router