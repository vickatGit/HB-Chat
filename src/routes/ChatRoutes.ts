import { Router } from "express";
const { 
    AddMessageController,
    CreateRoomController,
    GetRoomsController,
 } = require("../controller/ChatController");

const router = Router()

router.route('/rooms/:userId').get(GetRoomsController)

export default router