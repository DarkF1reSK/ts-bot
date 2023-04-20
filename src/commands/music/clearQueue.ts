import {CommandObject, CommandType} from "wokcommands";
import player from "../../utils/Player";

export default {
    description: "Clears the queue",
    type: CommandType.SLASH,
    guildOnly: true,

    callback: async ({interaction}) => {
        try {

            await interaction.deferReply()

            const queue = player.nodes.get(interaction.guild)

            if (!queue) {
                return interaction.editReply({ content: "There is no queue!" })
            }

            await queue.tracks.clear()

            return interaction.editReply({ content: "Queue cleared successfully!" })
        }catch (error) {
            console.log(error)
        }
    }
} as CommandObject