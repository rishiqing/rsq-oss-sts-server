const passport = require('passport')
const config = require('config')

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
}

const init = app => {
  app.use(passport.initialize())
  passport.use(new JwtStrategy(opts, (userInfo, done) => {
    //  验证jwt是否有权限
    global.logger.debug(`userInfo: ${JSON.stringify(userInfo)}`)
    return done(null ,userInfo)
  }))
}

module.exports.init = init