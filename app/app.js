const log = require('loglevel');
const handleLambdaEvent = require('./handle_lambda_event');

exports.lambdaHandler = async (event, context) => {
  log.setLevel('info');

  try {
    await handleLambdaEvent(event);
  } catch(err) {
    log.error(`Error occurred: ${require('util').inspect(err, { depth: null })}`);
    throw err;
  }
};
