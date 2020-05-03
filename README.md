# super-freight-easy

One lambda function that coverts the json Order file to the csv file that can be imported to the Super Freight system.

It is triggered by the SNS notification when one Order file is created in S3 Bucket. It then pulls the Order file and the store configuration file from the corresponding S3 Bucket, generates the Super Freight csv file, and upload the generated csv file back to the same S3 Bucket of the Order file.

## Local development

- Install [Node JS](https://nodejs.org/) (version 12)

- Install dependencies

```bash
super-freight-easy$ npm install --prefix ./app ./app
```

- Run tests

```bash
super-freight-easy$ npm run --prefix ./app test
```

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
super-freight-easy$ sam build
```

Run functions locally and invoke it with the `sam local invoke` command.

```bash
super-freight-easy$ sam local invoke GenerateSuperFreightCsvFunction --event events/event.json
```

## Deployment

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 12](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy, run the following in your shell:

```bash
super-freight-easy$ sam build
super-freight-easy$ sam deploy --guided
```

The first command will build the source of the application.
The second command will package and deploy the application to AWS.
