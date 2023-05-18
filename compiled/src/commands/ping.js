"use strict";
exports.__esModule = true;
var wokcommands_1 = require("wokcommands");
exports["default"] = {
    description: "Ping pong command",
    type: wokcommands_1.CommandType.BOTH,
    callback: function () {
        return {
            content: "Pong!"
        };
    }
};
