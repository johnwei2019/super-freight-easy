'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const handleLambdaEvent = require('../handle_lambda_event');
const bucket = 'dummy-bucket';
const key = 'dummy-key';
const snsMessage = {
  Records: [
    {
      s3: {
        bucket: {
          name: bucket
        },
        object: {
          key: key
        }
      }
    }
  ]
};
const event = {
  Records: [
    {
      Sns: {
        Message: JSON.stringify(snsMessage)
      }
    }
  ]
};

describe('handleLambdaEvent', function() {
  it('calls generateSuperFreightCsvFunc with correct params', async function() {
    const fake = sinon.fake();
    await handleLambdaEvent(event, fake);
    expect(fake.calledOnceWith(bucket, key)).to.be.true;
  });
});
