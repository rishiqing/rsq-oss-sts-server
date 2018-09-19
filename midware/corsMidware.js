const init = app => {
    //  跨域访问
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")
        res.set('Access-Control-Allow-METHOD', 'GET')
        next()
    })
}

module.exports.init = init
