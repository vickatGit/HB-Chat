

import mongoose , { Schema } from "mongoose"

const Room : Schema = new mongoose.Schema({
    members :{type: [ Schema.Types.ObjectId ] , ref : 'AuthModel'},
    admin : { type:Schema.Types.ObjectId,ref: 'AuthModel' },
    roomName: {type:String, required:true},    
    roomType : {type:String, required:true},
    roomThumb : {type:String, required:false}
})

export default mongoose.model("Room",Room)