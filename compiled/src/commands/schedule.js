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
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var wokcommands_1 = require("wokcommands");
var discord_js_1 = require("discord.js");
var schedule_schema_1 = __importDefault(require("../schemas/schedule-schema"));
//embed imports
var schedule_embeds_1 = require("../embeds/schedule-embeds");
exports["default"] = {
    description: "Schedules a message",
    type: wokcommands_1.CommandType.SLASH,
    options: [
        {
            name: "channel",
            description: "The channel to send the message to",
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "date",
            description: "The date to send the message to | format: YYYY/MM/DD",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "time",
            description: "The time to send the message to | format: HH:MM",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "clocktype",
            description: "Clock-type",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        /*{
            name: "timezone",
            description: "The timezone to send the message to",
            type: ApplicationCommandOptionType.String,
            required: true

        },*/
        {
            name: "message",
            description: "The message to send",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
    ],
    init: function (client) {
        var checkForPosts = function () { return __awaiter(void 0, void 0, void 0, function () {
            var query, results, _i, results_1, post, guildId, channelId, content, userName, guild, channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            date: {
                                $lte: Date.now()
                            }
                        };
                        return [4 /*yield*/, schedule_schema_1["default"].find(query)];
                    case 1:
                        results = _a.sent();
                        _i = 0, results_1 = results;
                        _a.label = 2;
                    case 2:
                        if (!(_i < results_1.length)) return [3 /*break*/, 5];
                        post = results_1[_i];
                        guildId = post.guildId, channelId = post.channelId, content = post.content, userName = post.userName;
                        return [4 /*yield*/, client.guilds.fetch(guildId)];
                    case 3:
                        guild = _a.sent();
                        if (!guild) {
                            return [3 /*break*/, 4];
                        }
                        channel = guild.channels.cache.get(channelId);
                        if (!channel) {
                            return [3 /*break*/, 4];
                        }
                        channel.send({
                            embeds: [schedule_embeds_1.Embeds.message(content, userName)]
                        });
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, schedule_schema_1["default"].deleteMany(query)];
                    case 6:
                        _a.sent();
                        setTimeout(checkForPosts, 1000 * 10);
                        return [2 /*return*/];
                }
            });
        }); };
        checkForPosts();
    },
    callback: function (_a) {
        var interaction = _a.interaction, guild = _a.guild;
        return __awaiter(void 0, void 0, void 0, function () {
            var channel, date, time, clockType, message, timeZone, validTimeZones, targetDate, interactionUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        channel = interaction.options.getChannel('channel');
                        date = interaction.options.getString('date');
                        time = interaction.options.getString('time');
                        clockType = interaction.options.getString('clocktype').toUpperCase();
                        message = interaction.options.getString('message');
                        timeZone = "CET";
                        if (clockType !== 'AM' && clockType !== 'PM') {
                            interaction.reply({
                                ephemeral: true,
                                embeds: [schedule_embeds_1.Embeds.invalidClockTypeEmbed()]
                            });
                            return [2 /*return*/];
                        }
                        validTimeZones = moment_timezone_1["default"].tz.names();
                        if (!validTimeZones.includes(timeZone)) {
                            interaction.reply({
                                ephemeral: true,
                                embeds: [schedule_embeds_1.Embeds.invalidTimeZoneEmbed()]
                            });
                            return [2 /*return*/];
                        }
                        targetDate = moment_timezone_1["default"].tz("".concat(date, " ").concat(time, " ").concat(clockType), 'YYYY-MM-DD HH:mm A', timeZone);
                        interaction.reply({
                            ephemeral: true,
                            embeds: [schedule_embeds_1.Embeds.scheduledMessage(message, targetDate.format("dddd, MMMM Do YYYY, h:mm a"))]
                        });
                        return [4 /*yield*/, interaction.guild.members.fetch(interaction.user.id)
                            //console.log(`nickname: ${interactionUser.nickname}, username ${interactionUser.user.username}, id: ${interactionUser.id}`)
                        ];
                    case 1:
                        interactionUser = _b.sent();
                        //console.log(`nickname: ${interactionUser.nickname}, username ${interactionUser.user.username}, id: ${interactionUser.id}`)
                        return [4 /*yield*/, new schedule_schema_1["default"]({
                                date: targetDate.valueOf(),
                                content: message,
                                guildId: guild.id,
                                channelId: channel.id,
                                userName: interactionUser.user.username
                            }).save()];
                    case 2:
                        //console.log(`nickname: ${interactionUser.nickname}, username ${interactionUser.user.username}, id: ${interactionUser.id}`)
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
};
