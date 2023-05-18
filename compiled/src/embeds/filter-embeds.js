"use strict";
exports.__esModule = true;
exports.Embeds = void 0;
var discord_js_1 = require("discord.js");
var Embeds = /** @class */ (function () {
    function Embeds() {
    }
    Embeds.currentFilters = function (filters) {
        var embed = new discord_js_1.EmbedBuilder()
            .setColor("Aqua")
            .setDescription("Current filters: ```".concat(filters, "```"))
            .setTimestamp();
        return embed;
    };
    Embeds.noFilters = function () {
        var embed = new discord_js_1.EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("There are no filters")
            .setTimestamp();
        return embed;
    };
    Embeds.noSongs = function () {
        var embed = new discord_js_1.EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("There are no songs in the queue")
            .setTimestamp();
        return embed;
    };
    Embeds.filterChange = function (filter, filterState) {
        if (filterState == "off") {
            var embed = new discord_js_1.EmbedBuilder()
                .setColor("DarkRed")
                .setDescription("**".concat(filter, "** turned **").concat(filterState, "**"))
                .setTimestamp();
            return embed;
        }
        else {
            var embed = new discord_js_1.EmbedBuilder()
                .setColor("DarkRed")
                .setDescription("**".concat(filter, "** turned **").concat(filterState, "**"))
                .setTimestamp();
            return embed;
        }
    };
    return Embeds;
}());
exports.Embeds = Embeds;
