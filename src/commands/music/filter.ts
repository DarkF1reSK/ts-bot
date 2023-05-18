import {CommandObject, CommandType} from "wokcommands";
import {useQueue} from "discord-player";
import {ApplicationCommandOptionType} from "discord.js";
import { Embeds } from "../../embeds/filter-embeds"

const filterStatus = {}


function toggleFilter(filter) {
    if (filterStatus[filter]) {
        filterStatus[filter] = false;
        return "off";
    } else {
        filterStatus[filter] = true;
        return "on";
    }
}

function getUsedFilters() {
    const usedFilters = Object.entries(filterStatus)
        .filter(([filter, status]) => status)
        .map(([filter]) => filter);
    return usedFilters.join(", ");
}

export default {
    description: "Audio filter",
    type: CommandType.SLASH,
    guildOnly: true,



    options: [
        {
            name: "filter",
            description: "Audio filter",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                  name: "8D",
                  value: "8D",
                },
                {
                    name: "nightcore",
                    value: "nightcore",
                },
                {
                    name: "bassboost",
                    value: "bassboost",
                },
                {
                    name: "dim",
                    value: "dim",
                },
                {
                    name: "chorus",
                    value: "chorus",
                },
                {
                    name: "karaoke",
                    value: "karaoke",
                },
                {
                    name: "normalizer",
                    value: "normalizer",
                },
                {
                    name: "surrounding",
                    value: "surrounding",
                },
                {
                    name: "treble",
                    value: "treble",
                },
                {
                    name: "show",
                    value: "show",
                },
            ]
        }
    ],


    callback: async ({interaction}) => {
        const queue = useQueue(interaction.guild.id)
        const filter = interaction.options.getString("filter")
        const usedFilters = getUsedFilters()

        if (!queue || !queue.isPlaying()) {
            return {embeds: [Embeds.noSongs()]}
        }


        if(filter === "show") {


            if (!usedFilters) {
                interaction.reply({embeds: [Embeds.noFilters()]})
                return
            } else {
                await interaction.reply({embeds: [Embeds.currentFilters(usedFilters)]})
                return
            }

        }


            interaction.deferReply()


            try {

                await queue.filters.ffmpeg.toggle(filter);

                const filterState = toggleFilter(filter)

                interaction.editReply({embeds: [Embeds.filterChange(filter, filterState)]})
            } catch (error) {
                interaction.editReply(error.message)
            }
        }

} as CommandObject

