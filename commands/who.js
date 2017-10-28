const CommandInfo    = require('../templates/commandInfo');
const Command        = require('../templates/command');
const ExtendedClient = require('../extendedClient');        //eslint-disable-line no-unused-vars
const { Message }    = require('discord.js');               //eslint-disable-line no-unused-vars

class WhoCommand extends Command {
    constructor() {
        super(new CommandInfo('who', 'Who said this?', 'who (..text)'));
    }

    /**
     * 
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async run(client, message, args) {
        if (!message.guild) {
            return message.reply('You have to be in a guild.');
        }
        const text = args.join(' ');

        await message.guild.members.fetch();

        const prediction = await client.predictionClient.predict(text, message.guild.id);

        message.reply(`I think ${prediction} is most likely to say it.`);
    }
}

module.exports = WhoCommand;