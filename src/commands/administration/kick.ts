import {CommandObject, CommandType} from "wokcommands";
import {Application, ApplicationCommandOptionType, GuildMember, PermissionFlagsBits} from "discord.js";
import {Embeds} from "../../embeds/kick-embeds"
export default {
    type: CommandType.BOTH,
    description: "kicks a user",
    permissions: [PermissionFlagsBits.KickMembers],
    guildOnly: true,

    options: [
        {
            name: "user",
            description: "User to kick",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "Reason for kick",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],

    callback: ({interaction}) => {
        const target = interaction.options.getMember("user") as GuildMember
        const reason = interaction.options.getString("reason")

        if(!target) {
            return {
                embeds: [Embeds.noTarget()],
                ephemeral: true,
            }
        }

        if (!target.kickable) {
            return {
                ephemeral: true,
                embeds: [Embeds.notKickAble()]
            }
        }


        target.kick(reason)
        return {
            ephemeral: true,
            embeds: [Embeds.success(target.id, reason)]
        }
    }
} as CommandObject