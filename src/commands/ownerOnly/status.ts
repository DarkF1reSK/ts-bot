import {CommandObject, CommandType} from "wokcommands";
import {ApplicationCommandOptionType, PresenceStatusData} from "discord.js";

import client from "../../index";


export default {
    type: CommandType.SLASH,
    description: "Sets the bot status",
    testOnly: true,
    ownerOnly: true,

    options: [
        {
            name: "activities",
            type: ApplicationCommandOptionType.String,
            description: "Custom status to set",
            required: true
        },
        {
            name: "status",
            type: ApplicationCommandOptionType.String,
            description: "online, idle... | default: Online |",
            required: true,
            choices: [
                {
                    name: "online",
                    value: "online"
                },
                {
                    name: "idle",
                    value: "idle"
                },
                {
                    name: "dnd",
                    value: "dnd"
                },
                {
                    name: "invisible",
                    value: "invisible"
                }
            ],
        },
    ],

    callback: async ({interaction, client}) => {
        const status = interaction.options.getString("status").toString() as PresenceStatusData
        const activities = interaction.options.getString("activities")

        client.user.setPresence({
            activities: [
                {
                    name: activities
                }
            ],
            status: status
        })
        interaction.reply("Status updated")

    }
} as CommandObject