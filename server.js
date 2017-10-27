const ExtendedClient = require('./extendedClient');
const config         = process.env.CONFIG_WHOSAIDBOT ? JSON.parse(process.env.CONFIG_WHOSAIDBOT) ? require('./config.json');
const client         = new ExtendedClient(config);

client.login(config.token)