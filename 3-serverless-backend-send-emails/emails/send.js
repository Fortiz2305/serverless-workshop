'use strict'

const AWS = require('aws-sdk')
const fs = require('fs')
const ses = new AWS.SES()

const getEmailParams = (record, emailHtml) => {
  return {
    Destination: {
      ToAddresses: [record.dynamodb.NewImage.email.S]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emailHtml.replace('Welcome aboard!', `${record.dynamodb.NewImage.name.S}, Welcome aboard!`)
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'Welcome to our product Text'
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `${record.dynamodb.NewImage.name.S}, Welcome to our product`
      }
    },
    ReplyToAddresses: [record.dynamodb.NewImage.email.S],
    Source: record.dynamodb.NewImage.email.S
  }
}

const sendEmail = (params, callback) => {
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error(err)
      callback(new Error('Couldn\'t send the email'))
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify({ data: JSON.stringify(data) })
      }
      callback(null, response)
    }
  })
}

module.exports.send = (event, context, callback) => {
  const emailHtml = fs.readFileSync('./emails/welcome_email.html', 'utf-8')

  event.Records.forEach(record => {
    if (record.eventName === 'INSERT') {
      const params = getEmailParams(record, emailHtml)
      sendEmail(params, callback)
    }
  })
}
