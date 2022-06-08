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

The "dynamic" nature of this is possible because of the [Serverless Framework](https://www.serverless.com/)

If feasible, I will build this into a [Serverless Framework plugin](https://www.serverless.com/plugins). Please [get in touch](mailto:ryan@storyboard.fm) if you're interested.

## Usage

### Deployment

First, install the Serverless CLI: `npm install -g serverless`

Second, change the value of the `s3UploadBucket` name in the `params` section of `serverless.yml`. S3 bucket names need to be globally unique. The name defined here has already been deployed, so it will not work until you change the name of the bucket.

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

After successful deployment, upload a file to the S3 bucket that was created and check the corresponding CloudWatch logs to verify that the function with the proper amount of storage with invoked.
