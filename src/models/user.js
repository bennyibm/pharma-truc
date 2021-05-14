const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique : true,
        trim: true,
        minLength: 10,
        maxLength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    account_type:{
        type : String,
        required : true
    }
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// userSchema.statics.findById = async (id)=>{
//     return await User.findById(id)
// }

userSchema.statics.findByID = async (id) =>{
    console.log("in the findById function...")
    return await User.findById(id)
}

userSchema.statics.findAll = async () =>{
    console.log("in the getAll function...")
    const filter = {}
    return await User.find(filter, (err, res)=>{return res})
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User