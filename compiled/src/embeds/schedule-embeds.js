"use strict";
exports.__esModule = true;
exports.Embeds = void 0;
var discord_js_1 = require("discord.js");
var Embeds = /** @class */ (function () {
    function Embeds() {
    }
    Embeds.invalidClockTypeEmbed = function () {
        var embed = new discord_js_1.EmbedBuilder()
            .setTitle("Error")
            .setColor("Red")
            .setDescription("Invalid clock type, please use `PM` or `AM`")
            .setTimestamp();
        return embed;
    };
    Embeds.invalidTimeZoneEmbed = function () {
        var embed = new discord_js_1.EmbedBuilder()
            .setTitle("Error")
            .setColor("Red")
            .setDescription("Invalid Timezone")
            .setTimestamp();
        return embed;
    };
    Embeds.scheduledMessage = function (message, date) {
        var embed = new discord_js_1.EmbedBuilder()
            .setTitle("Message scheduled")
            .setColor("Green")
            .setDescription("Scheduled message **".concat(message, "** to ").concat(date))
            .setTimestamp();
        return embed;
    };
    Embeds.message = function (message, user) {
        var embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setDescription("**".concat(message, "**"))
            .setFooter({ text: "Scheduled by ".concat(user) })
            .setTimestamp();
        return embed;
    };
    return Embeds;
}());
exports.Embeds = Embeds;
