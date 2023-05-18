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
exports.__esModule = true;
var wokcommands_1 = require("wokcommands");
var discord_player_1 = require("discord-player");
var discord_js_1 = require("discord.js");
var filter_embeds_1 = require("../../embeds/filter-embeds");
var filterStatus = {};
function toggleFilter(filter) {
    if (filterStatus[filter]) {
        filterStatus[filter] = false;
        return "off";
    }
    else {
        filterStatus[filter] = true;
        return "on";
    }
}
function getUsedFilters() {
    var usedFilters = Object.entries(filterStatus)
        .filter(function (_a) {
        var filter = _a[0], status = _a[1];
        return status;
    })
        .map(function (_a) {
        var filter = _a[0];
        return filter;
    });
    return usedFilters.join(", ");
}
exports["default"] = {
    description: "Audio filter",
    type: wokcommands_1.CommandType.SLASH,
    guildOnly: true,
    testOnly: true,
    options: [
        {
            name: "filter",
            description: "Audio filter",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "8D",
                    value: "8D"
                },
                {
                    name: "nightcore",
                    value: "nightcore"
                },
                {
                    name: "bassboost",
                    value: "bassboost"
                },
                {
                    name: "dim",
                    value: "dim"
                },
                {
                    name: "chorus",
                    value: "chorus"
                },
                {
                    name: "karaoke",
                    value: "karaoke"
                },
                {
                    name: "normalizer",
                    value: "normalizer"
                },
                {
                    name: "surrounding",
                    value: "surrounding"
                },
                {
                    name: "treble",
                    value: "treble"
                },
                {
                    name: "show",
                    value: "show"
                },
            ]
        }
    ],
    callback: function (_a) {
        var interaction = _a.interaction;
        return __awaiter(void 0, void 0, void 0, function () {
            var queue, filter, usedFilters, filterState, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queue = (0, discord_player_1.useQueue)(interaction.guild.id);
                        filter = interaction.options.getString("filter");
                        usedFilters = getUsedFilters();
                        if (!queue || !queue.isPlaying()) {
                            return [2 /*return*/, { embeds: [filter_embeds_1.Embeds.noSongs()] }];
                        }
                        if (!(filter === "show")) return [3 /*break*/, 3];
                        if (!!usedFilters) return [3 /*break*/, 1];
                        interaction.reply({ embeds: [filter_embeds_1.Embeds.noFilters()] });
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, interaction.reply({ embeds: [filter_embeds_1.Embeds.currentFilters(usedFilters)] })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                    case 3:
                        interaction.deferReply();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, queue.filters.ffmpeg.toggle(filter)];
                    case 5:
                        _b.sent();
                        filterState = toggleFilter(filter);
                        interaction.editReply({ embeds: [filter_embeds_1.Embeds.filterChange(filter, filterState)] });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        interaction.editReply(error_1.message);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
};
