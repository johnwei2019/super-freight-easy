const yaml = require('js-yaml');
const S3Client = require('./s3_client')

const createStoreConfig = ({
  storeId, storeName, address1, address2, suburb, postcode, state, phone, email
}) => ({
  storeId,
  storeName,
  address1,
  address2,
  suburb,
  postcode,
  state,
  phone,
  email
});

module.exports = async (storeId, s3Client = new S3Client()) => {
  const bucket = process.env.STORE_CONFIGS_BUCKET
  const key = `${storeId}/super_freight_config.yml`
  const configContent = await s3Client.get(bucket, key)
  const data = yaml.safeLoad(configContent)
  return createStoreConfig(data)
}
