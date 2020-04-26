'use strict';

const chai = require('chai');
const expect = chai.expect;
const createCsv = require('../create_csv');
const packages = [
  {
    referenceNumber: 36987,
    name: 'Jack A',
    address1: '',
    address2: '2A Dummy Road',
    suburb: 'Highland',
    postcode: '2000',
    state: 'New South Wales',
    phone: '+61 405 222 333',
    email: 'buyer.1@somewhere.com'
  },
  {
    referenceNumber: 36986,
    name: 'Jon B',
    address1: '10',
    address2: 'Happy Place',
    suburb: 'YANCHEP',
    postcode: '6035',
    state: 'WA',
    phone: '+61 400 555 666',
    email: 'buyer.2@somewhere.com'
  }
];
const storeConfig = {
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
const expectedCsv = require('fs').readFileSync('./tests/fixtures/packages_sample.csv').toString();

describe('createCsv', function() {
  it('create csv string from packages and store config', function() {
    const csv = createCsv(packages, storeConfig);
    expect(csv).to.eql(expectedCsv);
  })
})
