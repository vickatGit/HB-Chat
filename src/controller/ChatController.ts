import {
    AddTextMessageService,
    CreateRoomService
}  from '../service/chat_service'

const AddMessageController =async () => {
    const data:any = await AddTextMessageService({
        from:'dcnd',
        to:'dnc nd',
        msgType:'Text',
        msg:'dscd',
        mediaUrl:'sdncbdh'
    })
    console.log("insertion",data)
    Response.json({
        mess:data
    })
}

const CreateRoomController = async (members:Array<String>,admin:String,roomName:String) => {
    console.log("CreateRoomController",members.length)
    await CreateRoomService(members,admin,roomName)
}

module.exports = {
    AddMessageController,
    CreateRoomController
}