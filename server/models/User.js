const mongoose = require('mongoose')

/**
 * * 고명우
 * - userSchema 생성
 */
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
})

/**
 * * 고명우
 * - userSchema를 model로 감쌈
 */
const User = mongoose.model('User', userSchema)

module.exports = { User }
