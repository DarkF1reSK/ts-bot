import {CommandObject, CommandType} from "wokcommands";
import {ApplicationCommandOptionType} from "discord.js";
import {QueueRepeatMode} from "discord-player";
import player from "../../utils/Player";

export default {
    description: "Loops the queue",
    type: CommandType.SLASH,
    guildOnly: true,

    options: [
        {
            name: "options",
            description: "Select an option",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "off",
                    value: QueueRepeatMode.OFF,
                },
                {
                    name: "track",
                    value: QueueRepeatMode.TRACK,
                },
                {
                    name: "queue",
                    value: QueueRepeatMode.QUEUE,
                },
                {
                    name: "autoplay",
                    value: QueueRepeatMode.AUTOPLAY,
                },
            ]
        }
    ],
    callback: async ({interaction}) => {
        let loopMode = Number(interaction.options.getString("options"))


        try {

            const queue = player.nodes.get(interaction.guild)

            if (!queue || !queue.isPlaying()) {
                return interaction.reply({ content: "There is no queue!" })
            }

            queue.setRepeatMode(loopMode)
            const mode = loopMode === 1 ? `🔂` : loopMode === 2 ? `🔂` : `▶`
            return interaction.reply({ content: `${mode} | Updated loop mode ${loopMode}` })
        }catch (error) {
            console.log(error)
        }
    }
} as unknown as CommandObject