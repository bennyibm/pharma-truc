const express = require("express");

const PHARMS = require("../models/mocks/pharms");
const Pharm = require("../models/pharm");

const routes = express.Router();

routes.get("/pharms", (req, res) =>{
    console.log("request all pharms in the annuary...")
    Pharm.find({}, (error, response)=>{
        if(error)
            console.log(error)
        res.json(response)
        
    });

});


routes.get('/pharms/:id', async(req, res) => {
    console.log("try get a pharm with the id : " + req.params.id)
    try{
        res.send( await Pharm.findByID(req.params.id) )
    }catch(error){
        res.send(error)
    }
})

routes.post("/pharms", (req, res) =>{
    console.log("post request for save pharm : " + req.body.name);
    // Create a new user
    try {
        const pharm = new Pharm(req.body)
        pharm.save()
        res.status(201).send(pharm)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports =  routes;
