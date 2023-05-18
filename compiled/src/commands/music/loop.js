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
var discord_player_1 = require("discord-player");
var Player_1 = __importDefault(require("../../utils/Player"));
exports["default"] = {
    description: "Loops the queue",
    type: wokcommands_1.CommandType.SLASH,
    guildOnly: true,
    options: [
        {
            name: "options",
            description: "Select an option",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "off",
                    value: discord_player_1.QueueRepeatMode.OFF.toString()
                },
                {
                    name: "track",
                    value: discord_player_1.QueueRepeatMode.TRACK.toString()
                },
                {
                    name: "queue",
                    value: discord_player_1.QueueRepeatMode.QUEUE.toString()
                },
                {
                    name: "autoplay",
                    value: discord_player_1.QueueRepeatMode.AUTOPLAY.toString()
                },
            ]
        }
    ],
    callback: function (_a) {
        var interaction = _a.interaction;
        return __awaiter(void 0, void 0, void 0, function () {
            var loopMode, queue, mode;
            return __generator(this, function (_b) {
                loopMode = Number(interaction.options.getString("options"));
                try {
                    queue = Player_1["default"].nodes.get(interaction.guild);
                    if (!queue || !queue.isPlaying()) {
                        return [2 /*return*/, interaction.reply({ content: "There is no queue!" })];
                    }
                    queue.setRepeatMode(loopMode);
                    mode = loopMode === 1 ? "\uD83D\uDD02" : loopMode === 2 ? "\uD83D\uDD02" : "\u25B6";
                    return [2 /*return*/, interaction.reply({ content: "".concat(mode, " | Updated loop mode ").concat(loopMode) })];
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    }
};
