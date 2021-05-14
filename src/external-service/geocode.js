const axios = require("axios");
const GEOCODE_URL="http://api.positionstack.com/v1/forward?access_key=253bb8096c20d219ccf315ad51ef04a1&query=";

const adressToCoordonates = (adress) =>{

    console.log("try get coordonate from : " + adress)
    const url = GEOCODE_URL + adress
    console.log("url " + url);

    return axios.get(url)

}

module.exports = adressToCoordonates