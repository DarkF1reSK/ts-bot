import mongoose from 'mongoose';


export interface IScheduledPost {
    date: Date;
    content: string;
    guildId: string;
    channelId: string;
    userName: string;
}



const reqString = {
    type: String,
    required: true,
}

const scheduledSchema = new mongoose.Schema<IScheduledPost>({
    date: {
        type: Date,
        required: true,
    },
    content: reqString,
    guildId: reqString,
    channelId: reqString,
    userName: reqString,
})



const name = 'scheduled-posts'

const ScheduledPost: mongoose.Model<IScheduledPost> = mongoose.models[name] || mongoose.model<IScheduledPost>(name, scheduledSchema)
export default ScheduledPost