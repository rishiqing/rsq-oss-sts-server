global.logger = require('./config/logConfig').serverLogger

const express  = require('express')
const chalk = require('chalk')
const config = require('config')

const appSettings = require('./midware/appSettings')
const corsMidware = require('./midware/corsMidware')
// const requestParserMidware = require('./midware/requestParserMidware')
const passportMidware = require('./midware/passportMidware')
const routerMidware = require('./midware/routerMidware')
const errorHandler = require('./midware/errorHandler')


const app = express()

// 处理全局设置
appSettings.init(app)
// CORS跨域设置
corsMidware.init(app)
// 解析请求
// requestParserMidware.init(app)
// 权限认证
passportMidware.init(app)
// 路由设置
routerMidware.init(app)
// 错误处理
errorHandler.init(app)

// 开始监听
const port = config.port
app.listen(port, () => {
  global.logger(chalk.blue(`>>sts server started at port: ${port}`))
})