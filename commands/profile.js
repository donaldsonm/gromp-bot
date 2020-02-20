const config = require("../config.json");
const helper = require("../helper.js");

module.exports = {
    name: "profile",
    description: "Basic information about a LoL user",
    execute(message, args) {
        message.channel.send(helper.getSummoner(message, args));
    }
}