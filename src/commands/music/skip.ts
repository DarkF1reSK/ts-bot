import {CommandObject, CommandType} from "wokcommands";
import player from "../../utils/player";


export default {
    description: "Skips a current song",
    type: CommandType.SLASH,
    guild: true,

    callback: ({interaction}) => {
        try{
            const queue = player.nodes.get(interaction.guild)

            if (!queue || !queue.isPlaying()) {
                return interaction.reply({ content: "There is nothing playing" })
            }
            const currentTrack = (queue as any).current;
            const success = queue.node.skip()
            return interaction.reply({ content: `Skipped ${queue.currentTrack}` })
        }catch (error) {
            console.log(error)
        }

    }
} as CommandObject