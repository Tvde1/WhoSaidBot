const ExtendedClient = require('../extendedClient'); //eslint-disable-line no-unused-vars
const CommandInfo    = require('./commandInfo');
const { Message }    = require('discord.js');        //eslint-disable-line no-unused-vars

class Command {

    /**
     * Creates a new command. Must supply info.
     * @param {CommandInfo} info The command's info. 
     */
    constructor(info) {
        if (!info || !(info instanceof CommandInfo)) {
            throw new Error('You need to initialise a command with a CommandInfo class.');
        }

        this._info = info;
    }

    /**
     * Runs the command.
     * @param {ExtendedClient} client The active client.
     * @param {Message} message The received message.
     * @param {string[]} args The command's args.
     */
    async run(client, message, args) {
        throw new Error('This command does not have a run function.');
    }

    /**
     * @returns {CommandInfo}
     */
    get info() {
        return this._info;
    }
}

module.exports = Command;