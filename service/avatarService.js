const ossUtil = require('../oss/ossUtil')

const generateSTS = async (stsType, userInfo, params) => {
    if (!stsType) {
      throw new Error(`stsType not exist`)
    }
    if(!userInfo){
      throw new Error(`userInfo invalid: ${JSON.stringify(userInfo)}`)
    }
    return ossUtil.getStsToken(stsType, userInfo, params)
}

module.exports.generateSTS = generateSTS