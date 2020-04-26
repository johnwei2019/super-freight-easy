const S3Client = require('./s3_client')

const createPackage = (order) => {
  const address = order.post_address

  return {
    referenceNumber: order.sales_order_number,
    name: address.name,
    address1: address.address_1,
    address2: address.address_2,
    suburb: address.city,
    postcode: address.post_code,
    state: address.state,
    phone: address.phone,
    email: address.email
  }
}

module.exports = async (bucket, key, s3Client = new S3Client()) => {
  const fileContent = await s3Client.get(bucket, key)
  const data = JSON.parse(fileContent)
  return data.orders.map(createPackage)
}
