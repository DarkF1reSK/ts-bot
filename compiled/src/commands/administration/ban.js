"use strict";
exports.__esModule = true;
var wokcommands_1 = require("wokcommands");
var discord_js_1 = require("discord.js");
var ban_embeds_1 = require("../../embeds/ban-embeds");
exports["default"] = {
    type: wokcommands_1.CommandType.SLASH,
    description: "Bans a user",
    permissions: [discord_js_1.PermissionFlagsBits.BanMembers],
    guildOnly: true,
    options: [
        {
            name: "user",
            description: "User to ban",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "Reason for ban",
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
                ephemeral: true,
                embeds: [ban_embeds_1.Embeds.noTarget()]
            };
        }
        if (!target.bannable) {
            return {
                ephemeral: true,
                embeds: [ban_embeds_1.Embeds.notBanAble()]
            };
        }
        target.ban({
            reason: reason,
            deleteMessageDays: 7
        });
        return {
            ephemeral: true,
            embeds: [ban_embeds_1.Embeds.success(target.id, reason)]
        };
    }
};
