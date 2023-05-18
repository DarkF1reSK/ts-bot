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
var discord_js_1 = require("discord.js");
var Player_1 = __importDefault(require("../../utils/Player"));
var discord_player_1 = require("discord-player");
exports["default"] = {
    description: "plays a music",
    type: wokcommands_1.CommandType.SLASH,
    guildOnly: true,
    options: [
        {
            name: "track",
            description: "Music to play",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
    ],
    callback: function (_a) {
        var interaction = _a.interaction, guild = _a.guild;
        return __awaiter(void 0, void 0, void 0, function () {
            var check, result, results, yes_1, embed, yess, error_1;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        check = interaction.options.getString("track");
                        return [4 /*yield*/, Player_1["default"].search(check, {
                                requestedBy: interaction.user,
                                searchEngine: discord_player_1.QueryType.AUTO
                            })];
                    case 1:
                        result = _d.sent();
                        results = new discord_js_1.EmbedBuilder()
                            .setTitle("No results")
                            .setColor("#ff0000")
                            .setTimestamp();
                        if (!result.hasTracks()) {
                            return [2 /*return*/, interaction.reply({ embeds: [results] })];
                        }
                        return [4 /*yield*/, interaction.deferReply()];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, interaction.editReply({ content: "Loading a: ".concat(result.playlist ? 'playlist' : 'track') })];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, Player_1["default"].play((_b = interaction.member.voice.channel) === null || _b === void 0 ? void 0 : _b.id, result, {
                                nodeOptions: {
                                    metadata: {
                                        channel: interaction.channel,
                                        client: (_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.members.me,
                                        requestedBy: interaction.user.username
                                    },
                                    bufferingTimeout: 3000,
                                    leaveOnEnd: false
                                }
                            })];
                    case 4:
                        yes_1 = _d.sent();
                        embed = new discord_js_1.EmbedBuilder();
                        yess = function () {
                            var totalDurationMs = yes_1.track.playlist.tracks.reduce(function (a, c) { return c.durationMS + a; }, 0);
                            var totalDurationSec = Math.floor(totalDurationMs / 1000);
                            var hours = Math.floor(totalDurationSec / 3600);
                            var minutes = Math.floor((totalDurationSec % 3600) / 60);
                            var seconds = totalDurationSec % 60;
                            var durationStr = "".concat(hours.toString().padStart(2, '0'), ":").concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
                            return durationStr;
                        };
                        embed
                            .setDescription("".concat(yes_1.track.playlist ? "**multiple tracks** from: **".concat(yes_1.track.playlist.title, "**") : "**".concat(yes_1.track.title, "**")))
                            .setThumbnail("".concat(yes_1.track.playlist ? "".concat(yes_1.track.playlist.thumbnail) : "".concat(yes_1.track.thumbnail)))
                            .setColor("#00ff08")
                            .setTimestamp()
                            .setFooter({ text: "Duration: ".concat(yes_1.track.playlist ? "".concat(yess()) : "".concat(yes_1.track.duration), " | Event Loop Lag ").concat(Player_1["default"].eventLoopLag.toFixed(0)) });
                        return [2 /*return*/, interaction.editReply({ embeds: [embed] })];
                    case 5:
                        error_1 = _d.sent();
                        console.log(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
};
