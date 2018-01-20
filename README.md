# Serverless Web Application Workshop

In this workshop you can deploy a simple Demo Landing webpage for your favourite product. The application will show the features of your product, a sample video of those features and a email form contact for people who want to know more about the product. In the email form, it will call to a backend service in order to send an email with the user information.

The application architecture uses [AWS Lambda](https://aws.amazon.com/es/lambda/), [Amazon API Gateway](https://aws.amazon.com/es/api-gateway/), [Amazon S3](https://aws.amazon.com/es/s3/), [Amazon DynamoDB](https://aws.amazon.com/es/dynamodb/) and [Amazon Simple Email Service](https://aws.amazon.com/es/ses/).

Deploying the application, you can take two different approaches:

* Using the [Serverless](https://serverless.com/) framework

* Using the [AWS console](https://console.aws.amazon.com).

You can find the documentation for both options in each module.

## Modules

The workshop is broken up into different modules, one for each part of the result application. The idea is to do it in the order below:

1. [Web Hosting](1-web-hosting)
2. Email configuration
3. User Management
4. Serverless Backend
5. API

Once you have finished, you should delete the created resources to avoid billing charges.

## Requirements

### AWS Account

It is necessary to have an AWS Account with access to the services above. All the resources you will launch in this workshop are available in the [AWS Free Tier](https://aws.amazon.com/es/free/). Once you have the account, it is necessary to setup an account so that the Serverless framework can interact with AWS. You can do it following [this documentation](https://serverless.com/framework/docs/providers/aws/guide/credentials/) and there is also a [video](https://www.youtube.com/watch?v=HSd9uYj2LJA) which explains the process.

### Serverless Framework

If you want to do the workshop using the Serverless framework approach, you need to have the Serverless framework installed on your machine. To install it, you need `npm` and execute:

```
npm install -g serverless
```

More information in the [Serverless documentation](https://serverless.com/framework/docs/getting-started/).
