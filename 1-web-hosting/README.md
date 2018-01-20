# Module 1: Web Hosting using Amazon S3

In this module we are going to deploy a static web, using Amazon Simple Storage Service (S3) as host.
The architecture is pretty simple: all your static web files (HTML, CSS, Javascript, images, etc.) will be stored in Amazon S3 and we will apply some policies to let users access to the web.

![Website architecture](./images/architecture.png)

Firstly, we are going to solve the problem using the [Serverless](https://serverless.com/) framework. If you are already comfortable working with the AWS console and you don't want to use the framework "magic", you can go to the [Not using Serverless Framework](#not-using-serverless-framework) section.

## Using Serverless Framework

As we pointed in the requirements section, it is necessary to have the Serverless framework installed in your machine to deploy the resources using it. Once we have the framework installed, we need to create a file called `serverless.yml`, where we will add all the resources and configuration. When we execute the serverless deploy command, it looks for a file with this name in the current directory and it deploys the defined resources there.

We will add the content below in this file:

```yaml
service: serverless-static-website

provider:
  name: aws
  runtime: nodejs6.10
  region: eu-west-1
  profile: default
  stage: dev

plugins:
  - serverless-finch

custom:
  client:
    bucketName: serverless-static-website
```

As you can see, we are going to use the [serverless-finch](https://github.com/fernando-mc/serverless-finch) plugin to deploy the static files to S3.


## Not using Serverless Framework
