const S3 = require('aws-sdk/clients/s3');

module.exports = class S3Client {
  constructor(s3 = new S3({apiVersion: '2006-03-01'})) {
    this.s3 = s3
  }

  async get(bucket, key) {
    const params = {
      Bucket: bucket,
      Key: key
    }

    const resp = await this.s3.getObject(params).promise();
    return resp.Body.toString()
  }

  async put(bucket, key, content) {
    const params = {
      Bucket: bucket,
      Key: key,
      Body: content
    }
    await this.s3.putObject(params).promise();
  }
}
