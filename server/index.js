const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { User } = require('./models/User')
const config = require('./config/key')

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
/**
 * * 고명우
 * - mongoose 연결
 * ! mongoose cluster에서 ip white list 설정해줘야함
 */
mongoose
    .connect(config.mongoURI, {
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
 * - 회원가입 api
 */
app.post('/register', (req, res) => {
    const user = new User(req.body)
    console.log(user)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true,
        })
    })
})

/**
 * * 고명우
 * - 로그인 api
 */
app.post('/login', (req, res) => {
    // 요청 된 이메일 데이터베이스에서 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        // 이메일 검증
        if (!user) {
            return res.json({
                loginSucess: false,
                message: '이메일이 틀렸습니다.',
            })
        }
        // 비밀번호 검증
        user.comparePassword(req.body.password, (err, isMatch) => {
            // 비밀번호 오류시
            if (!isMatch) return res.json({ loginSucess: false, message: '비밀번호가 틀렸습니다.' })

            // 비밀번호까지 확인된다면 토큰생성
            user.generateToken((err, user) => {
                // 에러시
                if (err) return res.status(400).send(err)

                // 토큰을 쿠키에 저장
                res.cookie('x_auth', user.token).status(200).json({ loginSucess: true, userId: user._id })
            })
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
