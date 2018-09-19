const helmet = require('helmet')
const init = (app) => {
  //  允许使用X-Forwarded-For这个请求头来获得客户端ip
  //  当项目有前置反向代理的时候，可以设置为true，来获得客户端ip
  //  否则，要设置为false
  app.set('trust proxy', true)

  //  安全配置
  app.use(helmet())
}

module.exports.init = init