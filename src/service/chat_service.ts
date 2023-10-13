import mongoose from "mongoose";
import Message from "../models/Message";
import Room from '../models/Room'
// const MessageType  = require('../Types/MessageType')

export async function AddTextMessageService(msg:any){
    
    const message = new Message({
        from:msg.from,
        to:msg.to,
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
        roomName:roomName
    })
    await room.save()
}
