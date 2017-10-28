const ExtendedClient = require('../extendedClient');

/**
 * @param {ExtendedClient} client 
 */
function run (client) {
    client.logger.log('Ready', 'Bot is ready.');
    client.user.setPresence({ game: { name: 'ws!help' });
}

module.exports = run;