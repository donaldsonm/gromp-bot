module.exports = {
    name: "random",
    description: "Get a random integer from a given range, from 1 to [num] or [num1] to [num2].",
    usage: "-g random [num], -g random [num1] [num2]",
    execute(bot, message, args, db) {
        if (args.length == 1 && !args.some(isNaN)) {
            message.channel.send(Math.floor(Math.random() * Math.floor(args[0])) + 1);
        }
        else if (args.length == 2 && !args.some(isNan)) {
            message.channel.send(Math.floor(Math.random() * Math.floor(args[1] - args[0] + 1)) + Math.floor(args[0]));
        }
        else {
            console.log("Invalid arguments");
        }
    }
}