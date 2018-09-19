const generateSTS = () => {
    const userId = req.params.userId
    if (!userId) {
      return res.status(400)
    }
    const policy = await getProlicy(ossBucket + '/' + ossRootPath, userId)
  
    const result = await client.assumeRole(roleArn, policy, expiration, sessionName)
    console.log(result)
    return {
        AccessKeyId: result.credentials.AccessKeyId,
        AccessKeySecret: result.credentials.AccessKeySecret,
        SecurityToken: result.credentials.SecurityToken,
        Expiration: result.credentials.Expiration
      }
}

module.exports.generateSTS = generateSTS