import momentTimezone from 'moment-timezone';
import { CommandObject, CommandType} from "wokcommands";
import {ApplicationCommandOptionType} from "discord.js";
import scheduledSchema, {IScheduledPost} from "../../schemas/schedule-schema";


//embed imports
import {Embeds} from "../../embeds/schedule-embeds"


export default {
    description: "Schedules a message",
    type: CommandType.SLASH,


    options: [
        {
            name: "channel",
            description: "The channel to send the message to",
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "date",
            description: "The date to send the message to | format: YYYY/MM/DD",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "time",
            description: "The time to send the message to | format: HH:MM",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "clocktype",
            description: "Clock-type",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        /*{
            name: "timezone",
            description: "The timezone to send the message to",
            type: ApplicationCommandOptionType.String,
            required: true

        },*/
        {
            name: "message",
            description: "The message to send",
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],



    init: (client) => {
        const checkForPosts = async () => {
            const query = {
                date: {
                    $lte: Date.now(),
                },
            }

            const results = await scheduledSchema.find(query)

            for (const post of results) {
                const { guildId, channelId, content, userName} = post

                const guild = await client.guilds.fetch(guildId)
                if (!guild) {
                    continue
                }

                const channel = guild.channels.cache.get(channelId)
                if (!channel) {
                    continue
                }

                    channel.send({
                        embeds: [Embeds.message(content, userName)]
                    })

            }

            await scheduledSchema.deleteMany(query)

            setTimeout(checkForPosts, 1000 * 10)
        }

        checkForPosts()
    },


    callback: async ({interaction, guild}) => {
        const channel = interaction.options.getChannel('channel')
        const date = interaction.options.getString('date')
        const time = interaction.options.getString('time')
        const clockType = interaction.options.getString('clocktype').toUpperCase()
        const message = interaction.options.getString('message')
        //const timeZone = interaction.options.getString('timezone')
        //hardcoded timeZone feel free to remove it
        const timeZone = "CET"


        if (clockType !== 'AM' && clockType !== 'PM') {
            interaction.reply({
                ephemeral: true,
                embeds: [Embeds.invalidClockTypeEmbed()]
            })
            return
        }

        const validTimeZones = momentTimezone.tz.names()
        if (!validTimeZones.includes(timeZone)) {
            interaction.reply({
                ephemeral: true,
                embeds: [Embeds.invalidTimeZoneEmbed()]
            })
            return
        }
        const targetDate = momentTimezone.tz(
            `${date} ${time} ${clockType}`,
            'YYYY-MM-DD HH:mm A',
            timeZone
        )

        interaction.reply({
            ephemeral: true,
            embeds: [Embeds.scheduledMessage(message, targetDate.format("dddd, MMMM Do YYYY, h:mm a"))]
        })
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
        //console.log(`nickname: ${interactionUser.nickname}, username ${interactionUser.user.username}, id: ${interactionUser.id}`)
        await new scheduledSchema({
            date: targetDate.valueOf(),
            content: message,
            guildId: guild.id,
            channelId: channel.id,
            userName: interactionUser.user.username,
            id: Math.floor(Math.random() * 10000).toString(),
        }).save()

    }
} as CommandObject;