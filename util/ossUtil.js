
const client = new STS({
    accessKeyId: secret.aliOSS.accessKeyId,
    accessKeySecret: secret.aliOSS.accessKeySecret,
})
const ossRegion = 'oss-cn-beijing'
//  默认的bucket，文件附件位于这个bucket
const ossBucket = 'rishiqing-file'
//  图片的bucket
const ossImageBucket = 'rishiqing-images'
//  默认的bucket中的根目录
const ossRootPath = 'dingtalk/'
//  自定义的封面的目录
const ossCustomerCoverImagePath = 'cover/custom/'
const roleArn = secret.aliOSS.roleArn
const sessionName = 'qywxAppUser'
const expiration = 900
const port = 8300

const getProlicy = (path, strUser) => {
    var dir = path + strUser
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
          "Resource": ["acs:oss:*:*:" + dir, "acs:oss:*:*:" + dir + '*']
        }
      ],
      "Version": "1"
    })
}