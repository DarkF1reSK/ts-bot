"use strict";
exports.__esModule = true;
var wokcommands_1 = require("wokcommands");
var discord_js_1 = require("discord.js");
var kick_embeds_1 = require("../../embeds/kick-embeds");
exports["default"] = {
    type: wokcommands_1.CommandType.BOTH,
    description: "kicks a user",
    permissions: [discord_js_1.PermissionFlagsBits.KickMembers],
    guildOnly: true,
    options: [
        {
            name: "user",
            description: "User to kick",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "Reason for kick",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: false
        }
    ],
    callback: function (_a) {
        var interaction = _a.interaction;
        var target = interaction.options.getMember("user");
        var reason = interaction.options.getString("reason");
        if (!target) {
            return {
                embeds: [kick_embeds_1.Embeds.noTarget()],
                ephemeral: true
            };
        }
        if (!target.kickable) {
            return {
                ephemeral: true,
                embeds: [kick_embeds_1.Embeds.notKickAble()]
            };
        }
        target.kick(reason);
        return {
            ephemeral: true,
            embeds: [kick_embeds_1.Embeds.success(target.id, reason)]
        };
    }
};
