import Datastore from 'nedb-promises';
import path from "path"

export interface IScheduledPost {
    date: Date;
    content: string;
    guildId: string;
    channelId: string;
    userName: string;
    id: string;
}

