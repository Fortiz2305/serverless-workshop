'use strict'

const uuid = require('uuid')
const AWS = require('aws-sdk')

const dynamoDB = new AWS.DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime()
  const userData = JSON.parse(event.body)

  if (typeof userData.name !== 'string' || typeof userData.email !== 'string') {
    console.error('User name or email format is not valid')
    callback(new Error('Name or email format is not valid. Could\'t create the user'))
    return
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      name: userData.name,
      email: userData.email,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  dynamoDB.put(params, error => {
    if (error) {
      console.error(error)
      callback(new Error('Couldn\'t create the user'))
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item)
      }
      callback(null, response)
    }
  })
}
