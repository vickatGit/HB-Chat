"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Room = mongoose.Schema({
    members: { type: [mongoose.Schema.Types.ObjectId], ref: 'AuthModel' },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'AuthModel' },
    roomName: { type: String, required: true },
    roomType: { type: String, required: true }
});
exports.default = mongoose.model("Room", Room);
