import {CommandObject, CommandType} from "wokcommands";
import request from "request"
import {EmbedBuilder} from "discord.js";

interface Team {
    id: number;
    name: string;
    logo: string
}

interface Score {
    home: number;
    away: number;
}

interface periods {
    first: string;
    second: string;
    third: string
    overtime: string
    penalties: string
}

interface league {
    id: number;
    name: string;
    type: string;
    logo: string;
    season: number;
}

interface status {
    long: string;
    short: string;
}


interface Game {
    teams: {
        home: Team;
        away: Team;
    },
    scores: Score;
    periods: periods;
    league: league
    status: status
    id: number
    date: string
    time: string
    timestamp: number
    timezone: string
    week: string
    timer: string
}

interface APIResponse {
    get: string;
    response: Game[];
}

export default {
    description: "score",
    type: CommandType.SLASH,

    callback: async ({interaction}) => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        let todayDate = `${yyyy}-${mm}-${dd}`


        let options = {
            method: 'GET',
            url: 'https://v1.hockey.api-sports.io/games',
            qs: {league: "111",
                season: "2023",

                date: `2023-05-20`},
            headers: {
                'x-rapidapi-host': 'v1.hockey.api-sports.io',
                'x-rapidapi-key': '0af98c4008986f46dc7044a9cb8ca41b'
            },

        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            const apiResponse: APIResponse = JSON.parse(body);

            if (
                apiResponse.get === "games" &&
                apiResponse.response &&
                apiResponse.response.length > 0
            ) {

                const game: Game[] = apiResponse.response;
                const embeds: EmbedBuilder[] = [];
                console.log();
                game.forEach((game) => {
                    const embed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setDescription(`
            **Teams:** \`${game.teams.home.name} vs ${game.teams.away.name}\`
            **Score:** \`${game.scores.home} - ${game.scores.away}\`
            **Periods:** 
            \u200B \u200B \u200B \u200B First: \`${game.periods.first}\` 
            \u200B \u200B \u200B \u200B Second: \`${game.periods.second}\` 
            \u200B \u200B \u200B \u200B Third: \`${game.periods.third}\`
            \u200B \u200B \u200B \u200B Overtime: \`${game.periods.overtime}\`
            \u200B \u200B \u200B \u200B Penalties: \`${game.periods.penalties}\`
            **State:** \`${game.status.long}\`
          `);

                    embeds.push(embed);
                });

                interaction.reply({ embeds: embeds });
            } else {
                console.log("No scores available for the specified game.");
            }
        });
    }
} as CommandObject