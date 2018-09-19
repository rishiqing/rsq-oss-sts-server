const ossUtil = require('../oss/ossUtil')

const generateSTS = async (stsType, userInfo) => {
    if (!stsType) {
      throw new Error(`stsType not exist`)
    }
    if(!userInfo){
      throw new Error(`userInfo invalid: ${JSON.stringify(userInfo)}`)
    }
    return ossUtil.getStsToken(stsType, userInfo)
}

module.exports.generateSTS = generateSTS