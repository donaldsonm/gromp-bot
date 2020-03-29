const { Kayn } = require('kayn');
const { riotAPI } = require("../config.js");
const kayn = Kayn(riotAPI)();

module.exports = {
    name: "currentgame",
    description: "Get the current game of a League of Legends summoner given their region and name.",
    usage: "-g currentgame [region] [summoner name]",
    async execute(bot, message, args, db) {
        if (args.length >= 2) {
            const region = args[0];
            const summonerName = args.slice(1, args.length).join("");

            try {
                const { id } = await kayn.Summoner.by.name(summonerName).region(region);
                const game = await kayn.CurrentGame.by.summonerID(id);
                console.log(game);
            }
            catch (err) {
                message.channel.send("User is not in game.")
                throw err;
            }
        }
        else {
            console.log("Invalid arguments");
        }
    }
}