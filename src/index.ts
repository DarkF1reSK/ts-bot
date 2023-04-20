import {Client, GatewayIntentBits, Partials, Events} from 'discord.js';
import {token, mongouri, owners, testServers} from "../config.json"
import WOK, { DefaultCommands } from "wokcommands"
import path from "path";
import mongoose from "mongoose"

mongoose.set("strictQuery", true)



const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [Partials.Channel],

    },
);

export default client

client.on(Events.ClientReady, () => {
    console.log('Client ready')

    new WOK ({
        client,
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        events: {
            dir: path.join(__dirname, 'events'),
        },
        mongoUri: mongouri,
        testServers: testServers,
        botOwners: owners,
        disabledDefaultCommands: [
            DefaultCommands.ChannelCommand,
            DefaultCommands.CustomCommand,
            DefaultCommands.Prefix,
            DefaultCommands.RequiredPermissions,
            DefaultCommands.RequiredRoles,
            DefaultCommands.ToggleCommand
          ],


    })
})


client.login(token);