'use strict'

const encode = async (event, context) => {
  console.log('event:', JSON.stringify(event, null, 2))
  
  const message = event.Records[0].Sns.Message
  const jsonMessage = JSON.parse(message)
  
  const inputBucket = jsonMessage.bucket
  const inputKey = jsonMessage.key
  const fileSizeInMB = jsonMessage.fileSizeInMB
  
  console.log(`inputBucket: ${inputBucket}`)
  console.log(`inputKey: ${inputKey}`)
  console.log(`Invoked function ${context.functionName} for file size of ${fileSizeInMB} MB. Replace this function with a function that actually interacts with the file.`)
}

module.exports = { encode }