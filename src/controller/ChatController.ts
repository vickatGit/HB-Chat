import Room from '../models/Room'
import { Express,Request,Response,NextFunction } from 'express'
import {
    AddTextMessageService,
    CreateRoomService,
    GetChatsService
}  from '../service/chat_service'

const AddMessageController =async (from:String,to:String,msgType:String,msg:String,mediaUrl:String) => {
    const data:any = await AddTextMessageService({
        from:from,
        to:to,
        msgType:msgType,
        msg:msg,
        mediaUrl:mediaUrl
    })
    console.log("insertion",data)

}

const CreateRoomController = async (members:Array<String>,admin:String,roomName:String) => {
    console.log("CreateRoomController",members.length)
    await CreateRoomService(members,admin,roomName)
}
const GetRoomsController =async (req:Request,res:Response,next:NextFunction) => {
    console.log("userId",req.params.userId)
    const data = await GetChatsService(req.params.userId)
    res.status(200).send({
        data:data
    })
}


module.exports = {
    AddMessageController,
    CreateRoomController,
    GetRoomsController
}