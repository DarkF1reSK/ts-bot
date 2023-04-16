import {CommandObject, CommandType} from "wokcommands";
import player from "../../utils/player";
import {ApplicationCommandOptionType} from "discord.js";

export default {
    description: "Sets the volume for songs",
    type: CommandType.SLASH,
    guildOnly: true,

    options: [
        {
            name: "number",
            required: true,
            type: ApplicationCommandOptionType.Integer,
            description: "Volume"
        }
    ],

    callback: async ({interaction}) => {
        try{

            const queue = player.nodes.get(interaction.guild)


            if (!queue || !queue.isPlaying()) {
                return interaction.reply("There is nothing playing")
            }

            const vol = parseInt(interaction.options.getInteger("number"))

            if (!vol) {
                return interaction.reply(`Current volume is ${queue.node.volume}`)
            }

            const success = queue.node.setVolume(vol)

            interaction.reply({ content: success ? `volume set to ${vol}` : "something went wrong" })
        }catch (error) {
            console.log(error)
        }
    }
} as CommandObject