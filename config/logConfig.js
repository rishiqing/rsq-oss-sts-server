const path = require('path')
const { createLogger, format, transports } = require('winston')
const { combine, splat, timestamp, simple } = format
const config = require('config')

const serverPrefix = 'sts-server-'


const generateProps = (fileNamePrefix) => {
  const transportsArray = []
  // const exceptionHandlersArray = []
  const outputPath = config.log.outputPath
  //  如果有路径，那么就输出到路径中
  if(outputPath){
    transportsArray.push(
      new transports.File({
        filename: path.join(outputPath, `${fileNamePrefix}common.log`),
        handleExceptions: true
      })
    )
    // exceptionHandlersArray.push(
    //   new transports.File({
    //     filename: path.join(outputPath, fileNamePrefix + 'exception.log')
    //   })
    // )
  }else{
    transportsArray.push(new transports.Console({
      handleExceptions: true
    }))
    // exceptionHandlersArray.push(new transports.Console())
  }
  return {
    level: config.log.level,
    format: combine(
      splat(),
      timestamp(),
      simple()
    ),
    transports: transportsArray
    // exceptionHandlers: exceptionHandlersArray
  }
}

module.exports.serverLogger = createLogger(generateProps(serverPrefix))
