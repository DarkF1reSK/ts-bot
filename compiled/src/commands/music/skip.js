"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var wokcommands_1 = require("wokcommands");
var player_1 = __importDefault(require("../../utils/player"));
exports["default"] = {
    description: "Skips a current song",
    type: wokcommands_1.CommandType.SLASH,
    guild: true,
    callback: function (_a) {
        var interaction = _a.interaction;
        try {
            var queue = player_1["default"].nodes.get(interaction.guild);
            if (!queue || !queue.isPlaying()) {
                return interaction.reply({ content: "There is nothing playing" });
            }
            var currentTrack = queue.current;
            var success = queue.node.skip();
            return interaction.reply({ content: "Skipped ".concat(queue.currentTrack) });
        }
        catch (error) {
            console.log(error);
        }
    }
};
