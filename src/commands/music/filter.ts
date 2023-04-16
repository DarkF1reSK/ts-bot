import {CommandObject, CommandType} from "wokcommands";
import {useQueue} from "discord-player";
import {ApplicationCommandOptionType} from "discord.js";

export default {
    description: "Audio filter",
    type: CommandType.SLASH,
    guildOnly: true,

    options: [
        {
            name: "filter",
            description: "Audio filter",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                  name: "8D",
                  value: "8D",
                },
                {
                    name: "nightcore",
                    value: "nightcore",
                },
                {
                    name: "bassboost",
                    value: "bassboost",
                },
                {
                    name: "dim",
                    value: "dim",
                },
                {
                    name: "chorus",
                    value: "chorus",
                },
                {
                    name: "karaoke",
                    value: "karaoke",
                },
                {
                    name: "normalizer",
                    value: "normalizer",
                },
                {
                    name: "surrounding",
                    value: "surrounding",
                },
                {
                    name: "treble",
                    value: "treble",
                },
            ]
        }
    ],

    callback: async ({interaction}) => {
        const queue = useQueue(interaction.guild.id)
        const filter = interaction.options.getString("filter")

        if(!queue || !queue.isPlaying()) {
            return "There are no songs in the queue"
        }
        interaction.deferReply()
        try {
            await queue.filters.ffmpeg.toggle(filter)
            interaction.editReply(`Changed audio filter to ${filter}`)
        }
        catch (error){
            interaction.editReply(error.message)
        }
    }
} as CommandObject