const CommandInfo    = require('../templates/commandInfo');
const Command        = require('../templates/command');
const ExtendedClient = require('../extendedClient');        //eslint-disable-line no-unused-vars
const { Message }    = require('discord.js');               //eslint-disable-line no-unused-vars

class HelpCommand extends Command {
    constructor() {
        super(new CommandInfo('help', 'Help command.', 'help'));
    }

    run(client, message) {
        message.channel.send(`This bot uses machine learning to predict who would be most likely to say a certain text.
Use \`ws!who (...text)\` to make the bot guess who would say \`(...text)\`.`);
    }
}

module.exports = HelpCommand;