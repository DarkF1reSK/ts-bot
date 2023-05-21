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

interface Game {
    teams: {
        home: Team;
        away: Team;
    },
    scores: Score;
    periods: periods;
    league: league
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

                date: `${todayDate}`},
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
                const game: Game = apiResponse.response[0];
                const { home, away } = game.teams;
                const period = game.periods

                const message = `
Teams: ${home.name} vs ${away.name}
Score: ${game.scores.home} | ${game.scores.away}

**Periods:**
\`\`\`
first: ${period.first}
second: ${period.second}
third: ${period.third}
overtime: ${period.overtime}
penalties: ${period.penalties}
\`\`\``;


                interaction.reply({content: message});

            } else {
                console.log("No scores available for the specified game.");
            }
        });
    }
} as CommandObject