"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var config_json_1 = require("../config.json");
var wokcommands_1 = __importDefault(require("wokcommands"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1["default"].set("strictQuery", true);
var client = new discord_js_1.Client({ intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [discord_js_1.Partials.Channel]
});
exports["default"] = client;
client.on(discord_js_1.Events.ClientReady, function () {
    console.log('Client ready');
    new wokcommands_1["default"]({
        client: client,
        commandsDir: path_1["default"].join(__dirname, 'commands'),
        featuresDir: path_1["default"].join(__dirname, 'features'),
        events: {
            dir: path_1["default"].join(__dirname, 'events')
        },
        mongoUri: config_json_1.mongouri,
        testServers: config_json_1.testServers,
        botOwners: config_json_1.owners
    });
});
client.login(config_json_1.token);
