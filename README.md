<!--
title: 'lambda-dynamic-ephemeral-storage-example'
description: 'A simple example repo that demonstrates the dynamic ephemeral storage solution for AWS Lambda outlined in the corresponding Storyboard Dev Blog post.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/r-token'
authorName: 'Ryan Token'
-->


# AWS Lambda Dynamic Ephemeral Storage Example

A simple example repo that demonstrates the dynamic ephemeral storage solution for AWS Lambda outlined in the corresponding Storyboard Dev Blog post.

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying dynamic-ephemeral-storage-example to stage dev (us-east-1)

✔ Service deployed to stack dynamic-ephemeral-storage-example-dev (142s)

functions:
  step0Publisher: dynamic-ephemeral-storage-example-dev-step0Publisher (2.7 kB)
  512MBHandler: dynamic-ephemeral-storage-example-dev-512MBHandler (2.7 kB)
  1GBHandler: dynamic-ephemeral-storage-example-dev-1GBHandler (2.7 kB)
  3GBHandler: dynamic-ephemeral-storage-example-dev-3GBHandler (2.7 kB)
  5GBHandler: dynamic-ephemeral-storage-example-dev-5GBHandler (2.7 kB)
  10GBHandler: dynamic-ephemeral-storage-example-dev-10GBHandler (2.7 kB)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function 512MBHandler
```

Which should result in response similar to the following:

```json
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": {}\n}"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function 512MBHandler
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```
