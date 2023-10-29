import mongoose from "mongoose";
import Message from "../models/Message";
import Room from '../models/Room'
// const MessageType  = require('../Types/MessageType')

export async function AddTextMessageService(msg:any){
    
    const message = new Message({
        from:msg.from,
        toRoom:msg.toRoom,
        msgType:msg.msgType,
        msg:msg.msg,
        mediaUrl:msg.mediaUrl
    });

    return await message.save()
    
} 


export async function CreateRoomService(members:Array<String>,admin:String,roomName:String){
    console.log("CreateRoomService",members)
    const users:Array<mongoose.Types.ObjectId> = []
    for(let i = 0 ; i < members.length ; i++){
        console.log("id",members[i])
        users.push(new mongoose.Types.ObjectId(`${members[i]}`))
    }
    const room = new Room({
        members: users,
        admin:new mongoose.Types.ObjectId(`${admin}`),
        roomName:roomName,
        roomType:(users.length==2)?"Personal":"Group"
    })
    return await room.save()
}

export async function GetMessages(roomId:String){
    return await Message.find({toRoom:roomId})
}


export async function GetChatsService(userId:String){
    return await Room.find({members:{$in:[userId]}})
}


