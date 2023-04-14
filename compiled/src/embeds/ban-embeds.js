"use strict";
exports.__esModule = true;
exports.Embeds = void 0;
var discord_js_1 = require("discord.js");
var Embeds = /** @class */ (function () {
    function Embeds() {
    }
    Embeds.noTarget = function () {
        var embed = new discord_js_1.EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("Please tag someone to ban");
        return embed;
    };
    Embeds.notBanAble = function () {
        var embed = new discord_js_1.EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("Cannot ban that user");
        return embed;
    };
    Embeds.success = function (target, reason) {
        var embed = new discord_js_1.EmbedBuilder()
            .setColor("Green")
            .setDescription("You Banned <@".concat(target, "> for ").concat(reason));
        return embed;
    };
    return Embeds;
}());
exports.Embeds = Embeds;
