
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const clientSchema = mongoose.Schema({
    id : {
        type : Number,
        required : false,
    },
    username : {
        type : String,
        required : true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
        validate: value => {
            if (!validator.isPhone(value)) {
                throw new Error({error: 'Invalid phone number'})
            }
        }
    },
    adress: {
        type: Adress,
        required: true,
        minLength: 4,
        maxLength: 12
    }
   
})

clientSchema.pre('save', async function (next) {
    // Hash the password before saving the clientacie model
    const client = this
    //test if the phone and email are not already used by another client
    //and then process to save by the line bellow
    next()
})

clientSchema.statics.findByCredentials = async (email) => {
    // Search for a user by email and password.
    const client = await Client.findOne({ email} )
    if (!client) {
        throw new Error("there's no client associated to this email")
    }
    return client
}

clientSchema.statics.findById = async (id) => {
    // Search for a user by email and password.
    const client = await Client.findOne({ id} )
    if (!client) {
        throw new Error("there's no client associated to this id")
    }
    return client
}

const Client = mongoose.model('client', clientSchema)

module.exports = Client