const log = require('loglevel');
const loadStoreConfig = require('./load_store_config');
const loadPackages = require('./load_packages');
const createCsv = require('./create_csv');
const S3Client = require('./s3_client')

module.exports = async (bucket, key, s3Client = new S3Client()) => {
  const keyParts = key.split('/');
  if(keyParts.length !== 2) {
    return Promise.reject(new Error(`Order file key format error [${key}]`));
  }

  const [storeId, orderFileName] = keyParts;
  if(!orderFileName.endsWith('.json')) {
    return Promise.reject(new Error(`Order file must be a json file[${key}]`));
  }

  log.info(`Generating super freight CSV file from ${key} of bucket ${bucket}`)
  const storeConfig = await loadStoreConfig(storeId, s3Client);
  const packages = await loadPackages(bucket, key, s3Client);
  const csv = await createCsv(packages, storeConfig);
  const destkey = `${orderFileName.slice(0, -5)}-super-freight.csv_sf`;

  log.info(`Uploading super freight CSV file to bucket ${bucket} with key ${destkey}`)
  await s3Client.put(bucket, destkey, csv);
  log.info('Generating super freight CSV file finished')
};
