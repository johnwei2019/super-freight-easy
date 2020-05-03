'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const loadStoreConfig = require('../load_store_config');
const sampleData = require('fs').readFileSync('./tests/fixtures/store_config_sample.yaml').toString();
const bucket = 'dummy-bucket'
const userId = 'dummy-user-id';
const storeId = 'dummy-store-id';
const s3Client = {
  get: sinon.fake.resolves(sampleData)
};
const expectedConfig = {
  storeId: "dummy_store_id",
  storeName: "Dummy Store",
  address1: "Unit 1",
  address2: "Supernice Road",
  suburb: "Blackswan",
  postcode: "3100",
  state: "VIC",
  phone: "0436888999",
  email: "someone@gmail.com"
};

describe('loadStoreConfig', function() {
  beforeEach(function() {
    process.env.STORE_CONFIGS_BUCKET = bucket;
  })

  afterEach(function() {
    delete process.env.STORE_CONFIGS_BUCKET;
  })

  it('load store config from s3', async function() {
    await loadStoreConfig(userId, storeId, s3Client);
    expect(s3Client.get.calledOnceWith(
      bucket, 'dummy-user-id/dummy-store-id/super_freight_config.yml'
    )).to.be.true;
  });

  it('returns the store config data object', async function() {
    const config = await loadStoreConfig(userId, storeId, s3Client);
    expect(config).to.deep.equal(expectedConfig);
  });
});
