import {CommandObject, CommandType} from "wokcommands";
import {ApplicationCommandOptionType, EmbedBuilder} from "discord.js";
import player from "../../utils/Player";
import {QueryType} from "discord-player";

export default {
    description: "plays a music",
    type: CommandType.SLASH,
    guildOnly: true,

    options: [
        {
            name: "track",
            description: "Music to play",
            type: ApplicationCommandOptionType.String,
            required: true,

        },

    ],
    callback: async({interaction, guild}) => {
        try {

            const check = interaction.options.getString("track")

            const result = await player.search(check, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })


            const results = new EmbedBuilder()
                .setTitle(`No results`)
                .setColor(`#ff0000`)
                .setTimestamp()

            if (!result.hasTracks()) {
                return interaction.reply({embeds: [results]})
            }

            await interaction.deferReply()
            await interaction.editReply({ content: `Loading a: ${result.playlist ? 'playlist' : 'track' }`})

            const yes = await player.play(interaction.member.voice.channel?.id, result, {
                nodeOptions: {
                    metadata: {
                        channel: interaction.channel,
                        client: interaction.guild?.members.me,
                        requestedBy: interaction.user.username
                    },
                    bufferingTimeout: 3000,
                    leaveOnEnd: false,
                },

            })

            const embed = new EmbedBuilder()
            const yess = () => {
                const totalDurationMs = yes.track.playlist.tracks.reduce((a, c) => c.durationMS + a, 0)
                const totalDurationSec = Math.floor(totalDurationMs / 1000);
                const hours = Math.floor(totalDurationSec / 3600);
                const minutes = Math.floor((totalDurationSec % 3600) / 60);
                const seconds = totalDurationSec % 60;
                const durationStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                return durationStr
            };

            embed
                .setDescription(`${yes.track.playlist ? `**multiple tracks** from: **${yes.track.playlist.title}**` : `**${yes.track.title}**`}`)
                .setThumbnail(`${yes.track.playlist ? `${yes.track.playlist.thumbnail}` : `${yes.track.thumbnail}`}`)
                .setColor(`#00ff08`)
                .setTimestamp()
                .setFooter({ text: `Duration: ${yes.track.playlist ? `${yess()}` : `${yes.track.duration}`} | Event Loop Lag ${player.eventLoopLag.toFixed(0)}` })
            return interaction.editReply({ embeds: [embed ]})
        }catch (error) {
            console.log(error)
        }

    }
} as CommandObject