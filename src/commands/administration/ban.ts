import {CommandObject, CommandType} from "wokcommands";
import { ApplicationCommandOptionType, GuildMember, PermissionFlagsBits} from "discord.js";
import { Embeds} from "../../embeds/ban-embeds"
export default {
    type: CommandType.SLASH,
    testOnly: true,
    description: "Bans a user",
    permissions: [PermissionFlagsBits.BanMembers],
    guildOnly: true,

    options: [
        {
            name: "user",
            description: "User to ban",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "Reason for ban",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],

    callback: ({interaction}) => {
        const target = interaction.options.getMember("user") as GuildMember
        const reason = interaction.options.getString("reason")

        if(!target) {
            return {
                ephemeral: true,
                embeds: [Embeds.noTarget()]
            }
        }

        if (!target.bannable) {
            return {
                ephemeral: true,
                embeds: [Embeds.notBanAble()]
            }
        }


        target.ban({
            reason,
            deleteMessageDays: 7,
        })
        return {
            ephemeral: true,
            embeds: [Embeds.success(target.id, reason)]
        }
    }
} as CommandObject