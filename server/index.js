const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { User } = require('./models/User')

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * * 고명우
 * - mongoose 연결
 * ! mongoose cluster에서 ip white list 설정해줘야함
 * TODO 1. id, pw .env 도입해야할 필요 있음
 */
mongoose
    .connect('mongodb+srv://admin:1234@boilerplate-ho4sm.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

/**
 * * 고명우
 * - 메인페이지
 */
app.get('/', (req, res) => res.send('hello'))

/**
 * * 고명우
 * - 회원가입 페이지
 */
app.post('/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true,
        })
    })
})

/**
 * * 고명우
 * - 서버 실행
 */
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
