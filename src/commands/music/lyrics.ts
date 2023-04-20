import {CommandObject, CommandType} from "wokcommands";
import {ApplicationCommandOptionType, EmbedBuilder} from "discord.js";
const { lyricsExtractor } = require("@discord-player/extractor")
import player from "../../utils/Player";


const search = lyricsExtractor()

export default {
    description: "Lyrics",
    type: CommandType.SLASH,

    options: [
        {
            name: "name",
            description: "Song name for lyrics",
            required: true,
            type: ApplicationCommandOptionType.String,
        }
    ],
    callback: async ({interaction}) => {
        try{
            await interaction.deferReply("working")

            const queue = player.nodes.get(interaction.guild)
            const music = interaction.options.getString("name")
            if(!queue && !music) {
                return interaction.editReply({ content: "There is no queue and you didn't mention any song name!"})
            }

            if (queue || music) {
                const result = await search.search(music ?? queue.currentTrack.title)

                if (!result) {
                    return interaction.editReply({ content: `No lyrics found for: ${music ? music : queue.currentTrack.title}` })
                }

                const trimmedLyrics = result.lyrics.substring(0, 1997);

                const embed = new EmbedBuilder()
                    .setTitle(`${result.title}`)
                    .setThumbnail(`${result.thumbnail}`)
                    .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
                await interaction.editReply({ embeds: [embed] })
            }
        }catch (error) {
            if (error) {
                interaction.editReply({ content: "Could not parse lyrics"})
            }
            console.log(error)
            return "Error"
        }
    }
} as CommandObject