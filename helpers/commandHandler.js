const { Message }    = require('discord.js');          //eslint-disable-line no-unused-vars
const ExtendedClient = require('../extendedClient');   //eslint-disable-line no-unused-vars
const tvde1logger    = require('tvde1logger');          //eslint-disable-line no-unused-vars
const Command        = require('../templates/command'); //eslint-disable-line no-unused-vars
const fs             = require('fs');

class CommandHandler {
    /**
     * Creates a new commandhandler.
     * @param {tvde1logger} logger The actibe logger.
     */
    constructor(logger) {
        this._logger   = logger;
        this._commands = new Map();
    }

    /**
     * Loads commands.
     */
    load() {
        this._commands = new Map();
        fs.readdir('./commands', (err, cmds) => {
            if (err) {
                throw err;
            }
            for (const cmd of cmds) {
                const constructor = require(`../commands/${cmd}`);
                const command  = new constructor();

                this._commands.set(command.info.name.toLowerCase(), command);
            }
            this._logger.log('CommandHandler', 'Loaded commands.');
        });
    }

    /**
     * 
     * @param {ExtendedClient} client 
     * @param {Message} message 
     */
    async execute(client, message) {
        const [cmd, ...args] = message.content.substring(client.config.prefix.length).split(' ');

        const command = this._commands.get(cmd.toLowerCase());
        if (!command) {
            return;
        }

        try {
            await command.run(client, message, args);
        } catch (err) {
            message.channel.send(`❌ Error: \`${err.message}\`
If this keeps happening, contact Tvde1#9191.`);
        }
    }
}

module.exports = CommandHandler;