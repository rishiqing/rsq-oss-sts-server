const createError = require('http-errors')
const passport = require('passport')

const avatarService = require('../service/avatarService')

const init = app => {
    //  存活检测
    app.get('/', (req, res) => {
        res.end('success')
    })


    // 获取上传头像相关的sts
    app.get('/sts/:stsType',
    passport.authenticate('jwt', { session: false }),
     async (req, res, next) => {
        try {
            if(!req.params.stsType){
                return next(createError(500, `type not found`))
            }
            if(!req.query.fileName){
                return next(createError(500, `fileName not found`))
            }
            const result = await avatarService.generateSTS(req.params.stsType, req.user, req.query)
            res.json(result)
        } catch (err){
            next(err)
        }
    })
}

module.exports.init = init