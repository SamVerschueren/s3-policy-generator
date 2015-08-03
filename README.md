# s3-policy-generator

> Microservice that generates the policy document and returns a unique filename for the uploader.

## Usage

This AWS Lambda microservice can be used to generate a policy document for [browser-based uploads](http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-UsingHTTPPOST.html).

## Configuration

The code is not deploy-ready. As you will see, you can find an `aws.sample.json` file in the root directory. You should
rename the file to `aws.json` and add your own AWS Secret Access Key. This should be the key of an IAM user that is allowed
to put an object to S3.

## Deployment

This service is meant to be deployed with AWS Lambda. You can use `gulp` to create the zip file of the project.

```bash
$ npm run zip
```

This will produce a zip file in the `dist` directory. Upload the zip file to an AWS Lambda function and bind the service
to an API via AWS API Gateway.

## Author

- [@SamVerschueren](https://twitter.com/SamVerschueren) [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
