"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.scheduledDb = void 0;
var nedb_promises_1 = __importDefault(require("nedb-promises"));
var path_1 = __importDefault(require("path"));
exports.scheduledDb = nedb_promises_1["default"].create({ filename: path_1["default"].join(__dirname, "../database/schedule.db"), autoload: true });
