"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Image"] = 0] = "Image";
    MessageType[MessageType["Video"] = 1] = "Video";
    MessageType[MessageType["Text"] = 2] = "Text";
    MessageType[MessageType["Audio"] = 3] = "Audio";
})(MessageType || (MessageType = {}));
const MessageSchema = new mongoose_1.Schema({
    from: { type: String, required: true },
    toRoom: { type: String, required: true },
    msg: { type: String },
    msgType: { type: String, required: true },
    mediaUrl: { type: String }
});
const Message = mongoose_1.default.model('Message', MessageSchema);
exports.default = Message;
