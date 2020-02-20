const config = require("./config.json");

module.exports = {
    getSummoner: function(message, args) {
        let regionList = {
            ru: "ru",
            kr: "kr1",
            br: "br1",
            oce: "oc1",
            jp: "jp1",
            na: "na1",
            eune: "eun1",
            euw: "euw1",
            tr: "tr1",
            lan: "la1",
            las: "la2"
        };
        
        let region = "";
        if (args[0].toLowerCase() in regionList) {
            region = regionList[args[0].toLowerCase()];
        }

        let summonerName = "";
        for (let i = 1; i < args.length; i++) {
            summonerName += args[i].toLowerCase();
        }

        if (region.length == 0 || summonerName.length == 0) {
            console.log("Invalid arguments");
        }

        else {
            const summonerURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${config.riotAPI}`;
            
            let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            let request = new XMLHttpRequest();
            request.open('GET', summonerURL);
            request.send();
            
            request.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    return this.responseText;
                }
            }
        }
    }
}