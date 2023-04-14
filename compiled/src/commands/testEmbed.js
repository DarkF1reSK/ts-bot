"use strict";
exports.__esModule = true;
var wokcommands_1 = require("wokcommands");
var schedule_embeds_1 = require("../embeds/schedule-embeds");
exports["default"] = {
    description: "testing embeds",
    testOnly: true,
    type: wokcommands_1.CommandType.SLASH,
    callback: function (_a) {
        var interaction = _a.interaction;
        interaction.reply({ content: "<@&1088525221532803093>", embeds: [schedule_embeds_1.Embeds.message("da", Date())] });
    }
};
