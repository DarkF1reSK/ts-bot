import {Client, GatewayIntentBits, Partials, Events} from 'discord.js';
import {token, mongouri, owners, testServers} from "../config.json"
import WOK, { DefaultCommands } from "wokcommands"
import path from "path";



const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
    ],
    partials: [Partials.Channel],

    },
);

export default client



client.on(Events.ClientReady, async () => {


    new WOK ({
        client,
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        events: {
            dir: path.join(__dirname, 'events'),

        },
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