const log = require('loglevel');
const generateSuperFreightCsv = require('./generate_super_freight_csv');

const handleSnsEvent = async (snsEvent, generateSuperFreightCsvFunc) => {
  const snsMessage = JSON.parse(snsEvent.Sns.Message);
  await Promise.all(snsMessage.Records.map(async (e) => {
    await generateSuperFreightCsvFunc(e.s3.bucket.name, e.s3.object.key);
  }));
};

module.exports = async (event, generateSuperFreightCsvFunc = generateSuperFreightCsv) => {
  log.info(`Handling the event: ${require('util').inspect(event, { depth: null })}`);
  await Promise.all(event.Records.map(async (snsEvent) => {
    await handleSnsEvent(snsEvent, generateSuperFreightCsvFunc);
  }));
  log.info("Finish handling the event");
};
