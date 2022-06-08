'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const PossibleStorageTiers = {
  default: '512MB',
  small: '1GB',
  medium: '3GB',
  large: '5GB',
  max: '10GB'
}

const getFileSizeInMB = async (bucket, key) => {
  // s3.headObject gets the file headers without needing to download the file
  const headers = await s3.headObject({ Bucket: bucket, Key: key }).promise()
  const fileSizeInBytes = headers.ContentLength
  const fileSizeInMB = fileSizeInBytes / 1000000
  return fileSizeInMB
}

const getNearestStorageTier = (fileSizeInMB) => {
  if (fileSizeInMB < 500) {
    return PossibleStorageTiers.default
  } else if (fileSizeInMB < 1000) {
    return PossibleStorageTiers.small
  } else if (fileSizeInMB < 3000) {
    return PossibleStorageTiers.medium
  } else if (fileSizeInMB < 5000) {
    return PossibleStorageTiers.large
  } else if (fileSizeInMB < 10000) {
    return PossibleStorageTiers.max
  } else {
    throw new Error('File size is over 10GB, cannot download from Lambda')
  }
}

const getSnsTopicToTriggerDynamicStorageFunction = (storageTier, stage) => {
  switch (storageTier) {
    case PossibleStorageTiers.default:
      return stage === 'prod' ? 'arn:aws:sns:us-east-1:260462628773:encode-512MB-prod' : 'arn:aws:sns:us-east-1:260462628773:encode-512MB-dev'
      
    case PossibleStorageTiers.small:
      return stage === 'prod' ? 'arn:aws:sns:us-east-1:260462628773:encode-1GB-prod' : 'arn:aws:sns:us-east-1:260462628773:encode-1GB-dev'
      
    case PossibleStorageTiers.medium:
      return stage === 'prod' ? 'arn:aws:sns:us-east-1:260462628773:encode-3GB-prod' : 'arn:aws:sns:us-east-1:260462628773:encode-3GB-dev'
      
    case PossibleStorageTiers.large:
      return stage === 'prod' ? 'arn:aws:sns:us-east-1:260462628773:encode-5GB-prod' : 'arn:aws:sns:us-east-1:260462628773:encode-5GB-dev'
      
    case PossibleStorageTiers.max:
      return stage === 'prod' ? 'arn:aws:sns:us-east-1:260462628773:encode-10GB-prod' : 'arn:aws:sns:us-east-1:260462628773:encode-10GB-dev'
      
    default:
      throw new Error(`it should be impossible to get here, something went wrong. Storage Tier: ${storageTier}`)
  }
}

module.exports = {
  getFileSizeInMB,
  getNearestStorageTier,
  getSnsTopicToTriggerDynamicStorageFunction
}