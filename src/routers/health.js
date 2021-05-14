const expre = require("express");

const routes = expre.Router();

routes.get("/ping", (req, res) =>{
    console.log("ping request");
    res.send("pong");
})

routes.get("/pong", (req, res) =>{
    console.log("ping request");
    res.send("ping");
})

module.exports = routes