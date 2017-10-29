const CommandInfo    = require('../templates/commandInfo');
const Command        = require('../templates/command');
const ExtendedClient = require('../extendedClient');        //eslint-disable-line no-unused-vars
const { Message }    = require('discord.js');               //eslint-disable-line no-unused-vars

class GuildCommand extends Command {
    constructor() {
        super(new CommandInfo('guild', 'Info about the guild.', 'guild'));
    }

    /**
     * 
     * @param {ExtendedClient} client 
     * @param {Message} message 
     */
    async run(client, message) {

        if (!message.guild) {
            return message.reply('You\'re not in a guild.');
        }

        const guildMessages = await client.databaseClient.getMessagesFromGuild(message.guild.id);

        const amount = guildMessages.length;
        
        let userAmount = [];
        for (const m of guildMessages) {
            if (!userAmount.includes(m.author)) {
                userAmount.push(m.author);
            }
        }

        message.reply(`I have stored ${amount} messages of ${userAmount.length} different users.`);
    }
}

module.exports = GuildCommand;