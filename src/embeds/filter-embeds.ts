import {EmbedBuilder} from "discord.js"

export class Embeds {
    static currentFilters(filters): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("Aqua")
            .setDescription(`Current filters: \`\`\`${filters}\`\`\``)
            .setTimestamp()

        return embed
    }
    static noFilters(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("There are no filters")
            .setTimestamp()
        return embed
    }
    static noSongs(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("There are no songs in the queue")
            .setTimestamp()
        return embed
    }
    static filterChange(filter: String, filterState: String): EmbedBuilder {
        if (filterState == "off") {
            const embed = new EmbedBuilder()
                .setColor("DarkRed")
                .setDescription(`**${filter}** turned **${filterState}**`)
                .setTimestamp()
            return embed
        } else {
            const embed = new EmbedBuilder()
                .setColor("DarkRed")
                .setDescription(`**${filter}** turned **${filterState}**`)
                .setTimestamp()
            return embed
        }
    }

}