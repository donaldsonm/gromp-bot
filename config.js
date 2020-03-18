require('dotenv-flow').config();

module.exports = {
    prefix: process.env.PREFIX,
    riotAPI: process.env.RIOTAPI,
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS
}