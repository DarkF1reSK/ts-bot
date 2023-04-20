import {CommandObject, CommandType} from "wokcommands";
import scheduledSchema, {IScheduledPost} from "../../schemas/schedule-schema"
import {EmbedBuilder} from "discord.js";
export default {
    description: "list all scheduled messages for this guild",
    type: CommandType.SLASH,


    callback: async ({interaction, guild}) => {
        const data = await scheduledSchema.find({guildId: guild.id}).lean()

        const embed = new EmbedBuilder()
            .setTitle("Scheduled messages")

        await data.forEach(d => {
            //it works don't ask
            const messages = data.map((d) => `\`\`\`${d.content}\`\`\`**${d.date.toLocaleString("en-us", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,})} **\n id: \`${d.id}\`\n\n`).join("");
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