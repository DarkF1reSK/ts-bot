import {CommandObject, CommandType} from "wokcommands";
import {ApplicationCommandOptionType} from "discord.js";
import fs from "fs";
import path from "path";


const command = []

function reqDir (dir, name) {
    const files = fs.readdirSync(dir)

    files.forEach(async file => {
        const filePath = path.join(dir, file)

        if (fs.statSync(filePath).isDirectory()) {
            reqDir(filePath, name)
        } else {
            const moduleExports = require(filePath)
            if (moduleExports.default[name]) {
                command.push(moduleExports.default[name])
            }
            else {
                command.push(undefined)
            }
        }
    })
}


export default {
    description: "help command",
    type: CommandType.SLASH,
    testOnly: true,


    callback: async ({interaction}) => {
        reqDir(path.join(__dirname), "description")
        const helpMessage = command
            .filter((description) => description !== undefined)
            .map((description) => `• ${description}`)
            .join("\n");

        if (helpMessage) {
            interaction.reply(`Here are the available commands:\n${helpMessage}`);
        } else {
            interaction.reply("There are no available commands.");
        }


    }
} as CommandObject