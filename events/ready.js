const ExtendedClient = require('../extendedClient'); //eslint-disable-line no-unused-vars

/**
 * @param {ExtendedClient} client 
 */
function run (client) {
    client.logger.log('Ready', 'Bot is ready.');
    client.user.setPresence({ game: { name: 'ws!help' }});
}

module.exports = run;