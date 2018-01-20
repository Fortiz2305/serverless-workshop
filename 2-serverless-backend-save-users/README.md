# Module 2: Serverless Service Backend: Save users

The webpage that we deployed in the first section had a form in order to users request more information about the product. In this module we are going to create a backend service to save all users who fill that form. Then, in the next module, we will create another function to send an email to those users.

The architecture of this module is like the figure below. We will create a function which will be called each time a user fills the contact form. The function will take the user information and save it in a DynamoDB table.

![Service Architecture](./images/backend_service_dynamo.png)

The function will be invoked using AWS API Gateway. We will connect our service to an API endpoint. As we already did in the last module, we are going to solve this module using two approaches:

* Using Serverless framework: Go to [Using Serverless Framework](#using-serverless-framework) section.

* Using the AWS Console: Go to [Using the AWS console](#using-the-aws-console) section.

## Using Serverless Framework

## Using the AWS console

## Validation
