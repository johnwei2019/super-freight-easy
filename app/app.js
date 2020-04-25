const log = require('loglevel');

exports.lambdaHandler = async (event, context) => {
  log.setLevel('info');

  log.info(JSON.stringify({
      message: 'hello world',
      event: event,
      context: context
      // location: ret.data.trim()
  }));
};
