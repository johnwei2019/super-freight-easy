'use strict';

const fs = require('fs');
const sinon = require('sinon');
const chai = require('chai');
const S3Client = require('../s3_client');
const expect = chai.expect;
const bucket = 'test-bucket';
const key = 'test-key';
const sample_data = fs.readFileSync('./tests/fixtures/order_file_sample.json').toString();
const fakeS3 = {
  getObject: function() {
    return {
      promise: function() {
        return Promise.resolve({
          Body: Buffer.from(sample_data)
        });
      }
    };
  },
  putObject: function() {
    return {
      promise: function() {
        return Promise.resolve({});
      }
    };
  }
};

describe('s3Client', function() {
  describe('get', function() {
    it('calls the getObject method of the S3 service object with correct params', async function() {
      const getParams = {
        Bucket: bucket,
        Key: key
      };
      const spy = sinon.spy(fakeS3, 'getObject');

      const s3Client = new S3Client(fakeS3);
      const data = await s3Client.get(bucket, key);
      expect(spy.calledOnceWith(getParams)).to.be.true
    });

    it('returns the retrieved file content as string', async function() {
      const s3Client = new S3Client(fakeS3);
      const data = await s3Client.get(bucket, key);
      expect(data).to.equal(sample_data);
    });
  });

  describe('put', function() {
    it('calls the putObject method of the S3 service object with correct params', async function() {
      const putParams = {
        Bucket: bucket,
        Key: key,
        Body: sample_data
      }
      const spy = sinon.spy(fakeS3, 'putObject');

      const s3Client = new S3Client(fakeS3);
      const data = await s3Client.put(bucket, key, sample_data);
      expect(spy.calledOnceWith(putParams)).to.be.true
    })
  })
});
