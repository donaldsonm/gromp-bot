require('dotenv-flow').config();

module.exports = {
    prefix: process.env.PREFIX,
    riotAPI: process.env.RIOTAPI,
    token: process.env.TOKEN,
    owner: process.env.OWNER
}