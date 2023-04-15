import { Player, GuildQueue } from 'discord-player'
import client from "../index"


const player = new Player(client, {
    lagMonitor: 1000,
    ytdlOptions: {
        filter: "audioandvideo",
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

/*player.events.on('playerStart', (queue: GuildQueue, track) => {
    const metadata = queue.metadata as { channel: any };
    metadata.channel.send(`Started playing **${track.title}**!`)
});*/

export default player