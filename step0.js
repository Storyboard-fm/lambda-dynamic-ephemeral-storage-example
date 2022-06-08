'use strict'

const AWS = require('aws-sdk')
const sns = new AWS.SNS()

const { getFileSizeInMB, getNearestStorageTier, getSnsTopicToTriggerDynamicStorageFunction } = require('./utils')

const publisher = async (event) => {
  console.log('event:', JSON.stringify(event, null, 2))
  
  const stage = process.env.STAGE
  const inputBucket = event.Records[0].s3.bucket.name
  const inputKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '))
  
  const fileSizeInMB = await getFileSizeInMB(inputBucket, inputKey)
  const storageTierToUse = getNearestStorageTier(fileSizeInMB)
  const snsTopicArn = getSnsTopicToTriggerDynamicStorageFunction(storageTierToUse, stage)
  
  console.log(`inputBucket: ${inputBucket}`)
  console.log(`inputKey: ${inputKey}`)
  
  console.log(`fileSizeInMB: ${fileSizeInMB}`)
  console.log(`storageTierToUse: ${storageTierToUse}`)
  console.log(`publishing snsTopicArn: ${snsTopicArn}`)
  
  const snsParams = {
    Message: JSON.stringify({ bucket: inputBucket, key: inputKey, fileSizeInMB: fileSizeInMB}),
    TopicArn: snsTopicArn
  }
  
  await sns.publish(snsParams).promise()
}

module.exports = { publisher }