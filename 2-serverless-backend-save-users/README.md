# Module 2: Serverless Service Backend: Save users

The webpage that we deployed in the first section had a form in order to users request more information about the product. In this module we are going to create a backend service to save all users who fill that form. Then, in the next module, we will create another function to send an email to those users.

The architecture of this module is like the figure below. We will create a function which will be called each time a user fills the contact form. The function will take the user information and save it in a DynamoDB table.

![Service Architecture](./images/backend_service_dynamo.png)

The function will be invoked using AWS API Gateway. We will connect our service to an API endpoint. As we already did in the last module, we are going to solve this module using two approaches:

* Using Serverless framework: Go to [Using Serverless Framework](#using-serverless-framework) section.

* Using the AWS Console: Go to [Using the AWS console](#using-the-aws-console) section.

## Using Serverless Framework

As we did in the first section, we need to create a `serverless.yml` file. In this file, we will place all the configuration that Serverless needs to deploy our application.

We are going to create a function triggered via an API which will save users in a database in this section, and we are going to use DynamoDB as database. So, in the serverless file we are going to say AWS to create an [IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) in order to put items in the database. We will also add the `DYNAMODB_TABLE` variable to the environment. See the `provider` part of the file below:

```yaml
service: serverless-create-users-api

provider:
  name: aws
  runtime: nodejs6.10
  region: eu-west-1
  profile: default
  stage: dev
  environment:
    DYNAMODB_TABLE: ${self:service}-${opt:stage, self:provider.stage}
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:PutItem
      Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}"
```

Next thing we are going to do is to define the function that will create the users. You can find the function in the `users` folder and the function name is `create`. We are also saying that the function will be triggered through a HTTP POST request.

```yaml
functions:
  create:
    handler: users/create.create
    events:
      - http:
          path: users
          method: post
          cors: true
```

Finally, we are going to create the DynamoDB table where the users will be saved. To do this, we define the DynamoDB Table type in the `resources` section of the `serverless.yml` file. As you can see, we are taking the name of the table from the environment (as we defined in the `provider` section) and we are also defining some parameters like the primary key of the table and the DynamoDB read/write capacity. More information about this [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ProvisionedThroughput.html).

```yaml
resources:
  Resources:
    UsersTable:
      Type: AWS::DynamoDB::Table
      DeletionPolicy: Retain # Keeps around the DynamoDB resource when we redeploy/destroy
      Properties:
        AttributeDefinitions:
          -
            AttributeName: id
            AttributeType: S
        KeySchema:
          -
            AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: ${self:provider.environment.DYNAMODB_TABLE}

```

You can find the whole `serverless.yml` file in this folder.

Once you have the complete file, we are going to deploy. Execute:

```
serverless deploy
```

The command output will show the URL of the HTTP endpoint, it will be something like `https://0i5b3kodzl.execute-api.eu-west-1.amazonaws.com/dev/users`.

To check that the function works properly, go to [Validation](#validation):


## Using the AWS console

## Validation

We are going to check that the function works properly. Firstly, we are going to execute an HTTP request to create a new user:

```
curl -X POST 'https://0i5b3kodzl.execute-api.eu-west-1.amazonaws.com/dev/users' --data '{"name": "User Name", "email": "user@mail.com"}'
```

It should return something like:

```
```

If we go to the DynamoDB table, we can check that the new user was properly added.

[Insert Image]

And we also can check that our function was called one time and it finished without any errors, as well as the operation time duration.

[Insert Image]

If you have completed this module you can move to the next one: [Serverless Backend: Send Emails](../3-serverless-backend-send-emails).
