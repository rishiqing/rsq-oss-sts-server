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

const getResourcePath = async (userId) => {
    const ts = new Date().getTime()
    return `${ossBucket}/${ossPrefix}_${userId}_${ts}_avatar`
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
 * @param {userId} params.userId 
 */
const getStsConfig = async (params) => {
    const userId = params.id || params.oldId
    if(!userId){
        throw new Error(`userId not exists: ${JSON.stringify(params)}`)
    }
    const resourcePath = await getResourcePath(userId)
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