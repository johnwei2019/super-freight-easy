const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;

const csvHeader = [
  {id: 'referenceNumber', title: 'Reference number'},
  {id: 'companyName', title: 'ShipTo_companyName'},
  {id: 'name', title: 'ShipTo_name'},
  {id: 'address1', title: 'ShipTo_address1'},
  {id: 'address2', title: 'ShipTo_address2'},
  {id: 'suburb', title: 'ShipTo_suburb'},
  {id: 'postcode', title: 'ShipTo_postcode'},
  {id: 'state', title: 'ShipTo_State'},
  {id: 'phone', title: 'ShipTo_phone'},
  {id: 'email', title: 'ShipTo_email'},
  {id: 'storeCompanyName', title: 'ShipFrom_companyName'},
  {id: 'storeName', title: 'ShipFrom_name'},
  {id: 'storeAddress1', title: 'ShipFrom_address1'},
  {id: 'storeAddress2', title: 'ShipFrom_address2'},
  {id: 'storeSuburb', title: 'ShipFrom_suburb'},
  {id: 'storePostcode', title: 'ShipFrom_postcode'},
  {id: 'storeState', title: 'ShipFrom_state'},
  {id: 'storePhone', title: 'ShipFrom_phone'},
  {id: 'storeEmail', title: 'ShipFrom_email'},
  {id: 'parcelQuantity', title: 'Parcel_qty'},
  {id: 'parcelWeight', title: 'Parcel_weight'},
  {id: 'parcelLength', title: 'Parcel_length'},
  {id: 'parcelWidth', title: 'Parcel_width'},
  {id: 'parcelHeight', title: 'Parcel_height'},
  {id: 'deliverInstructions', title: 'settings.delivery_instructions'}
];

const createCsvRecord = (package, storeConfig) => {
  const address1 = package.address1 ?  package.address1 : package.address2;
  const address2 = package.address1 ?  package.address2 : "";

  return {
    referenceNumber: package.referenceNumber,
    companyName: '',
    name: package.name,
    address1,
    address2,
    suburb: package.suburb,
    postcode: package.postcode,
    state: package.state,
    phone: package.phone,
    email: package.email,
    storeCompanyName: '',
    storeName: storeConfig.storeName,
    storeAddress1: storeConfig.address1,
    storeAddress2: storeConfig.address2,
    storeSuburb: storeConfig.suburb,
    storePostcode: storeConfig.postcode,
    storeState: storeConfig.state,
    storePhone: storeConfig.phone,
    storeEmail: storeConfig.email,
    parcelQuantity: '',
    parcelWeight: '',
    parcelLength: '',
    parcelWidth: '',
    parcelHeight: '',
    deliverInstructions: ''
  };
};

module.exports = (packages, storeConfig) => {
  const csvStringifier = createCsvStringifier({ header: csvHeader });
  const csvRecords = packages.map(p => createCsvRecord(p, storeConfig));
  return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(csvRecords)
}
