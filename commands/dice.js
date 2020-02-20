module.exports = {
    name: "dice",
    description: "Roll a dice",
    execute(message, args) {
        if (args.length == 1) {
            message.channel.send(Math.floor(Math.random() * Math.floor(args[0])) + 1);
        }
        else if (args.length == 2) {
            message.channel.send(Math.floor(Math.random() * Math.floor(args[1] - args[0] + 1)) + Math.floor(args[0]));
        }
        else {
            console.log("Invalid arguments");
        }
    }
}