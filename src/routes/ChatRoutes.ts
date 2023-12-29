import { Router } from "express";
import { 
    // AddMessageController,
    // CreateRoomController,
    GetRoomsController,
    GetChatsController
 } from "../controller/ChatController"

const router = Router()

router.route('/rooms/:userId').get(GetRoomsController)
router.route('/chats/:roomId').get(GetChatsController)

export default router