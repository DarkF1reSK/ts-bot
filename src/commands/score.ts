import {CommandObject, CommandType} from "wokcommands";
import request from "request"

interface Team {
    id: number;
    name: string;
}

interface Score {
    home: number;
    away: number;
}

interface Game {
    teams: {
        home: Team;
        away: Team;
    },
    scores: Score;
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
                interaction.reply(`Home Team: ${home.name} Score ${game.scores.home}\nAway Team: ${away.name} Score ${game.scores.away}`);

            } else {
                console.log("No scores available for the specified game.");
            }
        });
    }
} as CommandObject