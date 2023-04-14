"use strict";
exports.__esModule = true;
exports.Embeds = void 0;
var discord_js_1 = require("discord.js");
var Embeds = /** @class */ (function () {
    function Embeds() {
    }
    Embeds.error = function () {
        var embed = new discord_js_1.EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("**You must specify a number between 1 and 100.**");
        return embed;
    };
    Embeds.success = function (size) {
        var embed = new discord_js_1.EmbedBuilder()
            .setColor("Green")
            .setDescription("Successfully deleted ".concat(size, " messages."));
        return embed;
    };
    return Embeds;
}());
exports.Embeds = Embeds;
