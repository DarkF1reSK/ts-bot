"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var chalk_1 = __importDefault(require("chalk"));
var moment_timezone_1 = __importDefault(require("moment-timezone"));
exports["default"] = (function (instance, client) {
    console.log(chalk_1["default"].yellow("[".concat(moment_timezone_1["default"].tz("CET"), "] Logged as ").concat(client.user.tag)));
});
