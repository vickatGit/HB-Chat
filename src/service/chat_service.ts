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
  console.log("getchats");
  Room.aggregate();
  const rooms = await Room.find({ members: { $in: [userId] } });
  const processRooms:any[] = [];
  await Promise.all(
    rooms.map(async (room: any) => {
      let friendId: string = "";
      room.members.forEach((member: string) => {
        if (userId != member) friendId = member;
      });
      if (friendId.length != 0) {
        const obj = new GetObjectCommand({
          Bucket: "habit-builder-bucket",
          Key: `images/avatars/${friendId}.jpeg`,
        });
        const url = await getSignedUrl(s3Client, obj);
        const roomWithUrl = room
        roomWithUrl.roomThumb = url
        processRooms.push(roomWithUrl)
        console.log("url", roomWithUrl);
      }else processRooms.push(room)
      if (room.admin.length!= 0) {
        const obj = new GetObjectCommand({
          Bucket: "habit-builder-bucket",
          Key: `images/avatars/${room.admin}.jpeg`,
        });
        const url = await getSignedUrl(s3Client, obj);
        const roomWithUrl = room
        roomWithUrl.adminImage = url
        processRooms.push(roomWithUrl)
        console.log("url", roomWithUrl);
      }else processRooms.push(room)
    })
  );
  return processRooms;
}
