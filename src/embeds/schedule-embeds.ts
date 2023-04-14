import {EmbedBuilder} from "discord.js";

export class Embeds {
    static invalidClockTypeEmbed(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setTitle("Error")
            .setColor("Red")
            .setDescription("Invalid clock type, please use `PM` or `AM`")

        return embed
    }

    static invalidTimeZoneEmbed(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setTitle("Error")
            .setColor("Red")
            .setDescription(`Invalid Timezone`)
        return embed
    }


    static scheduledMessage(message, date): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setTitle("Message scheduled")
            .setColor("Green")
            .setDescription(`Scheduled message **${message}** to ${date}`)

        return embed
    }
    static message(message, user): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`**${message}**`)
            .setFooter({text: `Scheduled by ${user}`})

        return embed
    }
}
