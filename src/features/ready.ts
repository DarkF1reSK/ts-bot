import WOK from "wokcommands";
import chalk from "chalk"
import momentTimezone from "moment-timezone";



export default (instance: WOK, client) => {
    console.log(chalk.yellow(`[${momentTimezone.tz("CET")}] Logged as ${client.user.tag}`))


}