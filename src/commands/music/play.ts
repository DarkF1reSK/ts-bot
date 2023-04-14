import {CommandObject, CommandType} from "wokcommands";
import {ApplicationCommandOptionType} from "discord.js";
import player from "../../utils/Player";

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
        }
    ],
    callback: async({interaction, guild}) => {
        const query = interaction.options.getString("track");

        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return {
                content: "You must be in a voice channel"
            }
        }
        await interaction.deferReply();
        try {
            const { track } = await player.play(voiceChannel, query, {
                nodeOptions: {
                    // nodeOptions are the options for guild node (aka your queue in simple word)
                    metadata: interaction // we can access this metadata object using queue.metadata later on
                }
            });
            return interaction.followUp(`**${track.title}** enqueued!`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Something went wrong: ${e}`);
        }

    }
} as CommandObject