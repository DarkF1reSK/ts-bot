"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var discord_player_1 = require("discord-player");
var index_1 = __importDefault(require("../index"));
var player = new discord_player_1.Player(index_1["default"], {
    lagMonitor: 1000,
    connectionTimeout: 300000,
    smoothVolume: true,
    ytdlOptions: {
        filter: "audioandvideo",
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});
/*player.events.on('playerStart', (queue: GuildQueue, track) => {
    const metadata = queue.metadata as { channel: any };
    metadata.channel.send(`Started playing **${track.title}**!`)
});*/
exports["default"] = player;
