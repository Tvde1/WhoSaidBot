const ExtendedClient = require('../extendedClient'); //eslint-disable-line no-unused-vars
const { Message }    = require('discord.js');        //eslint-disable-line no-unused-vars

/**
 * The event run function
 * @param {ExtendedClient} client The active client.
 * @param {Message} message The received message.
 */
function run(client, message) {

    if (message.author.bot) {
        return;
        //TODO: Maybe don't ignore bots?
    }

    if (message.content.length > 3) {
        client.databaseClient.saveMessage(message);
    }

    if (message.content.toLowerCase().startsWith(client.config.prefix.toLowerCase())) {
        client.commandHandler.execute(client, message);
    }
}

module.exports = run;