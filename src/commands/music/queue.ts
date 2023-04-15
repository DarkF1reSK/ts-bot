import {CommandObject, CommandType} from "wokcommands";
import { useQueue } from "discord-player"
import {EmbedBuilder} from "discord.js";

export default {
    description: "shows current queue",
    type: CommandType.SLASH,
    guild: true,

    callback: async ({interaction}) => {
        const queue = useQueue(interaction.guild.id);
        if(!queue || !queue.isPlaying()) {
            return "There are no songs in the queue"
        }
        try {
            const tracksTitle = queue.tracks.map(track => track).join('\n');
            const currentQueue = new EmbedBuilder()
                .setTitle("Current queue")
                .setDescription(`**Now playing**: ${queue.currentTrack} \n **Upcomming**: ${tracksTitle}`)
            return interaction.reply({embeds: [currentQueue]});
        }
        catch (err){
            return "The Queue is too long"
        }


    }
} as CommandObject