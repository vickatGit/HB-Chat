import Room from '../models/Room'
import { Express,Request,Response,NextFunction } from 'express'
import {
    AddTextMessageService,
    CreateRoomService,
    GetChatsService,
    GetMessages

}  from '../service/chat_service'

const AddMessageController =async (from:String,to:String,msgType:String,msg:String,mediaUrl:String) => {
    const data:any = await AddTextMessageService({
        from:from,
        toRoom:to,
        msgType:msgType,
        msg:msg,
        mediaUrl:mediaUrl
    })
    console.log("insertion",data)

}

const CreateRoomController = async (members:Array<String>,admin:String,roomName:String) => {
    console.log("CreateRoomController",members.length)
    return await CreateRoomService(members,admin,roomName)
}
const GetRoomsController =async (req:Request,res:Response,next:NextFunction) => {
    console.log("userId",req.params.userId)
    const data = await GetChatsService(req.params.userId)
    res.status(200).send({
        data:data
    })
}
const GetChatsController = async (req:Request,res:Response,next:NextFunction) => {
    const data = await GetMessages(req.params.roomId)
    res.status(200).send({
        data:data
    })
}


module.exports = {
    AddMessageController,
    CreateRoomController,
    GetRoomsController,
    GetChatsController
}