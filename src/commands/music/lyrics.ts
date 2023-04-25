import {CommandObject, CommandType} from "wokcommands";
import {ApplicationCommandOptionType, Embed, EmbedBuilder} from "discord.js";
import player from "../../utils/Player";
import { lyricsExtractor } from "@discord-player/extractor";
import {Client} from "genius-lyrics"
import {geniusKey} from "../../../config.json"


const search = lyricsExtractor()

const lyricsClient = new Client(geniusKey)

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
        //use this if it works
        /*try{
            await interaction.deferReply("working")

            const queue = player.nodes.get(interaction.guild)
            const music = interaction.options.getString("name")
            console.log(music)
            if(!queue && !music) {
                return interaction.editReply({ content: "There is no queue and you didn't mention any song name!"})
            }

            if (queue || music) {
                const result = await search.search(music ?? queue.currentTrack.title)

                const firstSong = result[0]

                if (!result) {
                    return interaction.editReply({ content: `No lyrics found for: ${music ? music : queue.currentTrack.title}` })
                }
                const lyrics = await firstSong.lyrics();

                const trimmedLyrics = lyrics.substring(0, 1997);
                console.log(trimmedLyrics)

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
        }*/

        try {

            await interaction.deferReply()
            const music = interaction.options.getString("name")


            const searches = await lyricsClient.songs.search(music);
            const firstSong = searches[0]

            const lyrics = await firstSong.lyrics()
            const trimmedLyrics = lyrics.substring(0, 4000)

            const embed = new EmbedBuilder()
                .setTitle(firstSong.artist.name)
                .setThumbnail(firstSong.thumbnail)
                .setDescription(trimmedLyrics)
                .setTimestamp()
            interaction.editReply({ embeds: [embed] })

        }
        catch (err) {
            interaction.editReply(err)

        }
    }
} as CommandObject