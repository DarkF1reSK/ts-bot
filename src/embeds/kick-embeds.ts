import {EmbedBuilder} from "discord.js"

export class Embeds {
    static noTarget(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("Please tag someone to kick")
            .setTimestamp()

        return embed
    }
    static notKickAble(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("Cannot kick that user")
            .setTimestamp()
        return embed
    }
    static success(target, reason): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`You kicked <@${target}> for ${reason}`)
            .setTimestamp()
        return embed
    }
}