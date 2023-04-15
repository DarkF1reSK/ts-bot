import {CommandObject, CommandType} from "wokcommands";
import player from "../../utils/player";

export default {
    description: "Shuffle the queue",
    type: CommandType.SLASH,
    guild: true,

    callback: async ({interaction}) => {
        try{
            const queue = player.nodes.get(interaction.guild)

            if (!queue || !queue.isPlaying()) {
                return interaction.reply({ content: "There is nothing in queue!", ephemeral: true })
            }

            await queue.tracks.shuffle();
            interaction.reply(`Queue shuffled`)

        }catch (error) {
            console.log(error)
        }
    }
} as CommandObject