import {CommandObject, CommandType} from "wokcommands";
import {IScheduledPost} from "../../schemas/schedule-schema"
import {EmbedBuilder} from "discord.js";
import {scheduledDb} from "../../features/createDB";


export default {
    description: "list all scheduled messages for this guild",
    type: CommandType.SLASH,


    callback: async ({interaction, guild}) => {
        const data = await scheduledDb.find<IScheduledPost>({ guildId: guild.id, });

        const embed = new EmbedBuilder()
            .setTitle("Scheduled messages")

        await data.forEach(d => {
            //it works don't ask

            const messages = data.map((d) => {
                const date = new Date(d.date)
                const formattedDate = date.toLocaleString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                return `\`\`\`${d.content}\`\`\`**${formattedDate}**\n id: \`${d.id}\`\n\n`;
            }).join("");
            embed.setDescription(messages)

        })

        try {
            interaction.reply({
                embeds: [embed],
            })
        } catch {
            interaction.reply({
                content: "List is too long",
                ephemeral: true,
            })
        }

    }
} as CommandObject