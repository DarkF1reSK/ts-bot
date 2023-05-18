"use strict";
exports.__esModule = true;
var wokcommands_1 = require("wokcommands");
var discord_js_1 = require("discord.js");
exports["default"] = {
    description: "dm a user",
    type: wokcommands_1.CommandType.SLASH,
    options: [
        {
            name: "user",
            description: "user to dm",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "message",
            description: "message to dm",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "number",
            description: "Time to send message",
            type: discord_js_1.ApplicationCommandOptionType.Integer,
            required: false
        }
    ],
    callback: function (_a) {
        var _b;
        var interaction = _a.interaction, client = _a.client;
        var id = interaction.options.getUser("user");
        var message = interaction.options.getString("message");
        var x = (_b = interaction.options.getInteger("number")) !== null && _b !== void 0 ? _b : 1;
        var i = 0;
        while (i < x) {
            client.users.send(id, message);
            i++;
        }
        interaction.reply({
            ephemeral: true,
            content: "Dm sent"
        });
    }
};
