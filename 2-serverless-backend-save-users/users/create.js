const uuid = require('uuid')
const AWS = require('aws-sdk')

const dynamoDB = new AWS.DynamoDB.DocumentClient()

function validateUserData(userData) {
  if (typeof userData.name !== 'string' || typeof userData.email !== 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User name or email format is not valid' })
    }
  }
}

function createParams(userData) {
  const timestamp = new Date().getTime()

  return {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      name: userData.name,
      email: userData.email,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }
}

module.exports.create = async event => {
  const userData = JSON.parse(event.body)

  validateUserData(userData)
  await dynamoDB.put(createParams(userData)).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'User successfully created' })
  }
}
