import mongoose, { Schema } from 'mongoose'
enum MessageType{
    Image,
    Video,
    Text,
    Audio
}
const MessageSchema:  Schema = new Schema({
    from: { type:String, required:true },
    to: { type:String, required:true },
    msg : {type:String},
    msgType: {type:String,required:true},
    mediaUrl:{ type:String }
    
})

const Message = mongoose.model('Message',MessageSchema);
export default Message
