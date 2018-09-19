const avatarService = require('./service/avatarService')

const init = app => {
    //  存活检测
    app.get('/', (req, res) => {
        res.end('success')
    })


    // 获取上传头像相关的sts
    app.get('/sts/avatar', async (req, res, next) => {
        try {
            res.json(avatarService.generateSTS())
        } catch (err){
            next(err)
        }
    })
}

module.exports.init = init