
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const geocode = require("../external-service/geocode")

const pharmSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 20
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    adress: {
        type: {},
        required: true
    },
    coordonates: {
        type: {},
        required: true,
        unique : true
    }
   
})

pharmSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const pharm = this
    console.log(pharm)
    if (pharm.isModified('adress')) {
        //fetch the geocode api to get coordonates
        const adressFormated = toStringAdress(pharm.adress);

        geocode(adressFormated).then(res  => callbacking(res, pharm) ) ;

        //console.log(pharm.coordonates);

        //pharm.coordonates = {"longitude" : 45823685478, "lattitude" : 1025486}
    }
    next()
})

const callbacking = (res, pharm) =>{
    console.log(res.data)

    pharm.coordonates = {"longitude" : res.data.longitude, 
                         "latitude" : res.data.latitude
                        }
    console.log(pharm.coordonates)

}

const toStringAdress = (adress) =>{
    return adress.numero + ", " + adress.avenue + ", " + adress.commune + "/Kinshasa"
}

pharmSchema.statics.findByID = async (id) =>{
    console.log("in the findById function...")
    return await Pharm.findById(id)
}


const Pharm = mongoose.model('pharmacie', pharmSchema)

module.exports = Pharm
