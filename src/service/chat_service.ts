import mongoose from "mongoose";
import Message from "../models/Message";
import Room from "../models/Room";
import AuthModel from "../models/AuthModel";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
config();
// const MessageType  = require('../Types/MessageType')

const s3Client = new S3Client({
  region: `${process.env.MY_AWS_REGION}`,
  credentials: {
    accessKeyId: `${process.env.MY_AWS_ACCESS_ID}`,
    secretAccessKey: `${process.env.MY_AWS_SECRET_ACCESS_KEY}`,
  },
});

export async function AddTextMessageService(msg: any) {
  const message = new Message({
    from: msg.from,
    toRoom: msg.toRoom,
    msgType: msg.msgType,
    msg: msg.msg,
    mediaUrl: msg.mediaUrl,
  });

  return await message.save();
}

export async function CreateRoomService(
  members: Array<String>,
  admin: String,
  roomName: String
) {
  console.log("CreateRoomService", members);
  const users: Array<mongoose.Types.ObjectId> = [];
  for (let i = 0; i < members.length; i++) {
    console.log("id", members[i]);
    users.push(new mongoose.Types.ObjectId(`${members[i]}`));
  }
  const room = new Room({
    members: users,
    admin: new mongoose.Types.ObjectId(`${admin}`),
    roomName: roomName,
    roomType: users.length == 2 ? "Personal" : "Group",
  });
  return await room.save();
}

export async function GetMessages(roomId: String) {
  return await Message.find({ toRoom: roomId });
}

export async function GetChatsService(userId: string) {
  const processRooms:any[] = [];
  try {
    console.log("getchats",userId);
    Room.aggregate();
    const rooms = await Room.find({ members: { $in: [userId] } });
    await Promise.all(
      rooms.map(async (room: any) => {
        let friendId: string = "";
        const roomWithUrl = room
        roomWithUrl.roomName="Habitude User"
        room.members.forEach((member: string) => {
          console.log(`userId : ${userId} friendId : ${member}  = ${userId!=member}`)
          if (userId != member) {
            friendId = member;
          }
        });
        if (friendId.length != 0) {
          const obj = new GetObjectCommand({
            Bucket: "habit-builder-bucket",
            Key: `images/avatars/${friendId}.jpeg`,
          });
          console.log("friendId ",friendId)
          const user:any = await AuthModel.findOne({_id:friendId})
          if(user){
            const url = await getSignedUrl(s3Client, obj);
            roomWithUrl.roomThumb = url
            roomWithUrl.roomName = user.username
          }
        }
        if (userId.length!= 0) {
          const obj = new GetObjectCommand({
            Bucket: "habit-builder-bucket",
            Key: `images/avatars/${userId}.jpeg`,
          });
          const url = await getSignedUrl(s3Client, obj);
          roomWithUrl.adminImage = url
        }
          processRooms.push(roomWithUrl)
      })
    );
  } catch (error) {
    throw error
  }

  return processRooms;
}
