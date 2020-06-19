const { User } = require('../models/User')

/**
 * * 고명우
 * - 유저 토큰인증 미들웨어
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
let auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth

    // 토큰 복호화 후 유저 검증
    User.findByToken(token, (err, user) => {
        // 검증 실패
        if (err) throw err
        if (!user) return res.json({ isAuth: false, error: true })

        // 검증 성공
        req.token = token
        req.user = user
        next()
    })
}

module.exports = { auth }
