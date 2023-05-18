import {CommandObject, CommandType} from "wokcommands";
import {ApplicationCommandOptionType} from "discord.js";

export default {
    description: "dm a user",
    type: CommandType.SLASH,

    options: [
        {
            name: "user",
            description: "user to dm",
            type: ApplicationCommandOptionType.User,
            required: true,

        },
        {
            name: "message",
            description: "message to dm",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "number",
            description: "Time to send message",
            type: ApplicationCommandOptionType.Integer,
            required: false,
        }
    ],

    callback: ({interaction, client}) => {
        const id = interaction.options.getUser("user")
        const message = interaction.options.getString("message")
        const x = interaction.options.getInteger("number") ?? 1
        let i = 0
        while (i < x) {
            client.users.send(id, message)
            i++
        }

        interaction.reply({
            ephemeral: true,
            content: "Dm sent"
        })

    }
} as CommandObject