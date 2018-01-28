# Module 3: Serverless Service Backend: Send emails

In the first module, we have created a simple webpage with an email form to get users data. In the second one, we have created a Lambda function which, triggered via an HTTP request, save an user information in a DynamoDB table. In this module, we are going to create the final part of this application. We are going to add a Lambda function which, every time a new entry is added in the DynamoDB table, will send an email to the specific user.

The architecture of this module is like the figure below. We will create a function which will be called each time a new entry is added in the DynamoDB table. The function will take the user information and send an email to the proper email address.

![Service Architecture](./images/backend_service_email.png)

So we have a new trigger for the Lambda function in this module. In the module 2 we used an API Gateway endpoint as trigger for the function. In this module, as we have said, we are going to use DynamoDB. Then, in order to send emails, we will use [AWS Simple Email Service](https://aws.amazon.com/es/ses/). As we are doing in all the modules, we are going to solve this problem using two approaches:

* Using Serverless framework: Go to [Using Serverless Framework](#using-serverless-framework) section.

* Using the AWS Console: Go to [Using the AWS console](#using-the-aws-console) section.

## Using Serverless Framework

## Using the AWS Console

## Validation
