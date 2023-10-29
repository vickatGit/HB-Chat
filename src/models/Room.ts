import { Schema } from "mongoose"

const mongoose  = require('mongoose')

const Room : Schema = mongoose.Schema({
    members :{type: [ mongoose.Schema.Types.ObjectId ] , ref : 'AuthModel'},
    admin : { type : mongoose.Schema.Types.ObjectId , ref : 'AuthModel' },
    roomName: {type:String, required:true},    
    roomType : {type:String, required:true}
})

export default mongoose.model("Room",Room)