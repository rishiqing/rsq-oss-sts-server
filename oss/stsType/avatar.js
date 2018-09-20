const config = require('config')
const path = require('path')

const thisType = path.basename(__filename).split('.')[0]
const typeConfig = config.oss.sts[thisType]
const defaults = config.oss.defaults


const ossRegion = typeConfig.ossRegion || defaults.ossRegion
//  默认的bucket，文件附件位于这个bucket
const ossBucket = typeConfig.ossBucket || defaults.ossBucket
//  默认的bucket中的根目录
const ossPrefix = typeConfig.ossPrefix || defaults.ossPrefix
//  自定义的封面的目录
const roleArn = typeConfig.roleArn || defaults.roleArn
//  oss会话的名称
const sessionName = typeConfig.sessionName || defaults.sessionName
//  超时时间
const expiration = typeConfig.expiration || defaults.expiration

const getResourcePath = async (userId, fileName) => {
    const ts = new Date().getTime()
    const extname = path.extname(fileName)
    return `${ossBucket}/${ossPrefix}_${userId}_${ts}_avatar${extname}`
    // return `${ossBucket}/${ossPrefix}_${userId}_avatarlogo.jpg`
}

const getPolicy = async (path) => {
    return JSON.stringify({
      "Statement": [
        {
          "Action": [
            "oss:GetObject",
            "oss:PutObject",
            "oss:ListParts",
            "oss:AbortMultipartUpload",
          ],
          "Effect": "Allow",
          "Resource": ["acs:oss:*:*:" + path]
        }
      ],
      "Version": "1"
    })
}

/**
 * 通过id生成具有权限的资源路径
 * @param {userId} userInfo.userId 
 */
const getStsConfig = async (userInfo, params) => {
    const userId = userInfo.id || userInfo.oldId
    const fileName = params.fileName
    if(!userId){
        throw new Error(`userId not exists: ${JSON.stringify(userInfo)}`)
    }
    if(!fileName){
        throw new Error(`fileName not exists`)
    }
    const resourcePath = await getResourcePath(userId, fileName)
    const policy = await getPolicy(resourcePath)

    return {
        ossRegion: ossRegion,
        ossBucket: ossBucket,
        roleArn: roleArn,
        sessionName: sessionName,
        expiration: expiration,
        resourcePath: resourcePath,
        policy: policy
    }
}

module.exports.getStsConfig = getStsConfig