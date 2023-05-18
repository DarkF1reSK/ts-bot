import {EmbedBuilder} from "discord.js";

export class Embeds {
    static invalidClockTypeEmbed(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setTitle("Error")
            .setColor("Red")
            .setDescription("Invalid clock type, please use `PM` or `AM`")
            .setTimestamp()

        return embed
    }

    static invalidTimeZoneEmbed(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setTitle("Error")
            .setColor("Red")
            .setDescription(`Invalid Timezone`)
            .setTimestamp()
        return embed
    }


    static scheduledMessage(message, date): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setTitle("Message scheduled")
            .setColor("Green")
            .setDescription(`Scheduled message **${message}** to ${date}`)
            .setTimestamp()

        return embed
    }
    static message(message, user): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`**${message}**`)
            .setFooter({text: `Scheduled by ${user}`})
            .setTimestamp()

        return embed
    }
}
