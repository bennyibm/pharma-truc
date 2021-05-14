const express = require("express");
const cors = require("cors");

const health = require("./routers/health");
const pharm = require("./routers/pharm");
const auth = require("./routers/auth");

require("./database/db");

const port = process.env.PORT;

//const pharm = require("./routers/pharm");

const index = express();

index.use(express.json());

index.use("/", health);
index.use("/", pharm);
index.use("/", auth);

index.listen(port, () =>{
    console.log("server listening on " + port);
});
