'use strict';

const chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const sinon = require('sinon');
const fs = require('fs');
const generateSuperFreightCsv = require('../generate_super_freight_csv');
const configBucket = 'dummy-config-bucket';
const configFielKey = 'dummy_user_id/dummy_store_id/super_freight_config.yml';
const configFileData = fs.readFileSync('./tests/fixtures/store_config_sample.yaml').toString();
const orderFileBucket = 'dummy-order-file-bucket';
const orderFileKey = 'dummy_user_id/dummy_store_id/dummy_order_file_name.json';
const ordersFileData = fs.readFileSync('./tests/fixtures/order_file_sample.json').toString();
const s3Client = {
  get(bucket, key) {
    if(bucket === configBucket && key == configFielKey) {
      return Promise.resolve(configFileData);
    } else if (bucket === orderFileBucket && key == orderFileKey) {
      return Promise.resolve(ordersFileData);
    } else {
      console.log(`bucket: ${bucket}, key: ${key}`);
      return Promise.reject(new Error('Unexpected arguments'));
    }
  },
  put(bucket, key, content) {
    return Promise.resolve({});
  }
};
const expectedCsv = fs.readFileSync('./tests/fixtures/packages_sample.csv').toString();

describe('generateSuperFreightCsv', function() {
  beforeEach(function() {
    process.env.STORE_CONFIGS_BUCKET = configBucket;
  })

  afterEach(function() {
    delete process.env.STORE_CONFIGS_BUCKET;
  })

  it('generates the super freight csv file to S3', async function() {
    const spy = sinon.spy(s3Client, 'put');
    await generateSuperFreightCsv(orderFileBucket, orderFileKey, s3Client);
    expect(spy.calledOnceWith(
      'dummy-order-file-bucket', 'dummy_order_file_name-super-freight.csv_sf', expectedCsv
    )).to.be.true;
  });

  context('when the order file key with incorrect format', function() {
    it('throws error', async function() {
      const result = generateSuperFreightCsv(orderFileBucket, 'order-file-name.json', s3Client);
      expect(result).to.be.rejectedWith(Error)
    });
  });

  context('when the order file is not a json file', function() {
    it('throws error', async function() {
      const result = generateSuperFreightCsv(orderFileBucket, 'dummy_user_id/dummy_store_id/dummy_order_file_name.csv', s3Client);
      expect(result).to.be.rejectedWith(Error)
    });
  });
});
