import {CommandObject, CommandType} from "wokcommands";
import player from "../../utils/player";

export default {
    description: "pause the current song",
    type: CommandType.SLASH,
    guildOnly: true,

    callback: async ({interaction}) => {
        try {
            const queue = player.nodes.get(interaction.guild)

            if (!queue || !queue.isPlaying()) {
                return interaction.reply({ content: "There is nothing playing", ephemeral: true })
            }

            const paused = queue.node.setPaused(true)
            return interaction.reply({ content: paused ? 'paused' : "something went wrong" })
        }catch (error) {
            console.log(error)
        }
    }
} as CommandObject