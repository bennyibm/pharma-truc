const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = express.Router()

router.get("/users", async (req, res)=>{
    console.log("get all registered uers")
    User.find({}, (error, response)=>{
        if(error)
            console.log(error)
        res.json(response)
        
    });
})

router.get('/users/:id', async(req, res) => {
    console.log("try get user with the id : " + req.params.id)
    try{
        res.send( await User.findByID(req.params.id) )
    }catch(error){
        res.send(error)
    }
})

router.post('/users', async (req, res) => {
    console.log("register user : " + req.body.email)

     // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }

})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router