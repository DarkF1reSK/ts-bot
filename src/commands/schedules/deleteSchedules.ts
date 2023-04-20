import {CommandObject, CommandType} from "wokcommands";
import {ApplicationCommandOptionType} from "discord.js";
import scheduledSchema, {IScheduledPost} from "../../schemas/schedule-schema"

export default {
    description: "Delete scheduled message by id",
    type: CommandType.SLASH,

    options: [
        {
            name: "id",
            type: ApplicationCommandOptionType.String,
            description: "You can get id by doing /listSchedules",
            required: true
        }
    ],

    callback: async ({interaction, guild}) => {
        const sche_id = interaction.options.getString("id")
        await scheduledSchema.findOneAndDelete({guildId: guild.id, id: sche_id})
        interaction.reply({
            content: "Schedule deleted",
        })

    }



} as CommandObject