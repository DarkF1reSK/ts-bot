import Datastore from "nedb-promises";
import path from "path";

export const scheduledDb = Datastore.create({ filename: path.join(__dirname, "../database/schedule.db"), autoload: true })

