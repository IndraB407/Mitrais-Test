const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const roleUser = new mongoose.Schema({
    rolename:{
        type: String,
        required: true
    },
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Please enter username'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'minimum password length is 6 character'],
    },
    tokenUser: [{
        token: {
            type: String,
            required: true
        }
    }],
    jobFamily: {
        type: String,
        required: true
    },
    Grade: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    roleid: roleUser
},{ timestamps: true })



// sample for test
// const testUser = new User({
//     name: "Fauzi Faruq Nabbani",
//     username: "fauzifn2",
//     password: "test1234567",
//     jobFamiy: "SE",
//     Grade: "JP",
//     dateOfBirth: "1998-09-20",
//     roleid : {
//         rolename: "Staff"
//     }
// })
// console.log(testUser.roleid.rolename)


userSchema.statics.findByCredentials = async (username, password) => {
    try {
        const users = await User.findOne({username})
        if(!users)
            throw new Error()
        const isMatch = await bcrypt.compare(password, users.password)

        if(!isMatch)
            throw new Error()
        return users
    } catch (err) {
        return "you can't to login"
        
    }
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data:  user._id.toString() 
      }, 'secret');
    user.tokenUser = user.tokenUser.concat({ token });
    await user.save();
    return token;
}

// call sebelum menjalankan method lain, dan ini merupkan asyncro
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})


const User = mongoose.model('user', userSchema);
module.exports = User