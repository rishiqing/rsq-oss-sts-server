const fs = require('fs')
const path = require('path')
const config = require('config')
const STS = require('ali-oss').STS

const stsTypeRoot = path.join(__dirname, 'stsType')
const stsTypeMap = {}

const client = new STS({
    accessKeyId: config.oss.accessKeyId,
    accessKeySecret: config.oss.accessKeySecret,
})

const init = () => {
    fs.readdirSync(stsTypeRoot).forEach(fileName => {
        const filePath = path.join(stsTypeRoot, fileName)
        const stats = fs.lstatSync(filePath)
        // 筛选出目录文件，在目录文件下查找index.js文件
        if(stats.isFile()){
            stsTypeMap[fileName.split('.')[0]] = require(filePath)
            global.logger.info(`${fileName} stsType installed`)
        }
      })
}

init()


/**
 * 对外暴露的接口，获取实际的token
 * @param {*} stsType sts的类型，需要跟stsType文件夹下的js文件名对应
 * @param {*} userInfo userInfo信息，实际为jwt解析出来的验证信息
 */
const getStsToken = async (stsType, userInfo) => {
    const stsConfigHandler = stsTypeMap[stsType]
    if(!stsConfigHandler || !stsConfigHandler.getStsConfig){
        throw new Error(`stsType not found in sysTypeMap: ${stsType}`)
    }

    const stsConfig = await stsConfigHandler.getStsConfig(userInfo)

    const result = await client.assumeRole(stsConfig.roleArn, stsConfig.policy, stsConfig.expiration, stsConfig.sessionName)

    return {
        resourcePath: stsConfig.resourcePath,
        ossRegion: stsConfig.ossRegion,
        ossBucket: stsConfig.ossBucket,
        AccessKeyId: result.credentials.AccessKeyId,
        AccessKeySecret: result.credentials.AccessKeySecret,
        SecurityToken: result.credentials.SecurityToken,
        Expiration: result.credentials.Expiration
    }
}

module.exports.getStsToken = getStsToken