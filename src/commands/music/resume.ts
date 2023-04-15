import {CommandObject, CommandType} from "wokcommands";
import player from "../../utils/player";

export default {
    description: "pause the current song",
    type: CommandType.SLASH,
    guild: true,

    callback: async ({interaction}) => {
        try{
            const queue = player.nodes.get(interaction.guild)

            if (!queue || !queue.isPlaying()) {
                return interaction.reply("There is nothing playing")
            }

            const paused = queue.node.setPaused(false)
            return interaction.reply("resumed successfully")
        }catch (error) {
            console.log(error)
        }
    }
} as CommandObject