import {CommandType} from "wokcommands";
import {PermissionFlagsBits} from "discord.js"
import {ApplicationCommandOptionType} from "discord.js";
import {default_clearMessages} from "../../../config.json"

import {Embeds} from "../../embeds/clear-embeds"

export default {
    description: "clear messages",
    type: CommandType.SLASH,
    permissions: [PermissionFlagsBits.ManageMessages],
    testOnly: true,
    guildOnly: true,
    options: [
        {
            name: "amount",
            description: "amount of messages to clear",
            type: ApplicationCommandOptionType.Integer,
            required: false
        },
    ],

    callback: async ({interaction}) => {
        const amount = interaction.options.getInteger("amount") ?? default_clearMessages
        if (amount <= 0 || amount > 100) {
            return interaction.reply({
                embeds: [Embeds.error()],
                ephemeral: true,
            });
        }

        const channel = interaction.channel
        const deleted = await channel.bulkDelete(amount, true)

        return interaction.reply({
            embeds: [Embeds.success(deleted.size)],
            ephemeral: true,
        });
    }
}