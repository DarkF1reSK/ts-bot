"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var reqString = {
    type: String,
    required: true
};
var scheduledSchema = new mongoose_1["default"].Schema({
    date: {
        type: Date,
        required: true
    },
    content: reqString,
    guildId: reqString,
    channelId: reqString,
    userName: reqString
});
var name = 'scheduled-posts';
var ScheduledPost = mongoose_1["default"].models[name] || mongoose_1["default"].model(name, scheduledSchema);
exports["default"] = ScheduledPost;
