"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var wokcommands_1 = require("wokcommands");
var request_1 = __importDefault(require("request"));
var discord_js_1 = require("discord.js");
exports["default"] = {
    description: "score",
    type: wokcommands_1.CommandType.SLASH,
    callback: function (_a) {
        var interaction = _a.interaction;
        return __awaiter(void 0, void 0, void 0, function () {
            var today, dd, mm, yyyy, todayDate, options;
            return __generator(this, function (_b) {
                today = new Date();
                dd = String(today.getDate()).padStart(2, '0');
                mm = String(today.getMonth() + 1).padStart(2, '0');
                yyyy = today.getFullYear();
                todayDate = "".concat(yyyy, "-").concat(mm, "-").concat(dd);
                options = {
                    method: 'GET',
                    url: 'https://v1.hockey.api-sports.io/games',
                    qs: { league: "111",
                        season: "2023",
                        date: "2023-05-20" },
                    headers: {
                        'x-rapidapi-host': 'v1.hockey.api-sports.io',
                        'x-rapidapi-key': '0af98c4008986f46dc7044a9cb8ca41b'
                    }
                };
                (0, request_1["default"])(options, function (error, response, body) {
                    if (error)
                        throw new Error(error);
                    var apiResponse = JSON.parse(body);
                    if (apiResponse.get === "games" &&
                        apiResponse.response &&
                        apiResponse.response.length > 0) {
                        var game = apiResponse.response;
                        var embeds_1 = [];
                        console.log();
                        game.forEach(function (game) {
                            var embed = new discord_js_1.EmbedBuilder()
                                .setColor('#0099ff')
                                .setDescription("\n            **Teams:** `".concat(game.teams.home.name, " vs ").concat(game.teams.away.name, "`\n            **Score:** `").concat(game.scores.home, " - ").concat(game.scores.away, "`\n            **Periods:** \n            \u200B \u200B \u200B \u200B First: `").concat(game.periods.first, "` \n            \u200B \u200B \u200B \u200B Second: `").concat(game.periods.second, "` \n            \u200B \u200B \u200B \u200B Third: `").concat(game.periods.third, "`\n            \u200B \u200B \u200B \u200B Overtime: `").concat(game.periods.overtime, "`\n            \u200B \u200B \u200B \u200B Penalties: `").concat(game.periods.penalties, "`\n            **State:** `").concat(game.status.long, "`\n          "));
                            embeds_1.push(embed);
                        });
                        interaction.reply({ embeds: embeds_1 });
                    }
                    else {
                        console.log("No scores available for the specified game.");
                    }
                });
                return [2 /*return*/];
            });
        });
    }
};
