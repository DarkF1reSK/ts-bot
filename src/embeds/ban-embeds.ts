import {EmbedBuilder} from "discord.js"

export class Embeds {
    static noTarget(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("Please tag someone to ban")

        return embed
    }
    static notBanAble(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("Cannot ban that user")
        return embed
    }
    static success(target, reason): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`You Banned <@${target}> for ${reason}`)
        return embed
    }
}