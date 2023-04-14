import {EmbedBuilder} from "discord.js"

export class Embeds {
    static error(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setDescription("**You must specify a number between 1 and 100.**")

        return embed
    }
    static success(size): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Successfully deleted ${size} messages.`)
        return embed
    }
}