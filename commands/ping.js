const CommandInfo = require('../templates/commandInfo');
const Command     = require('../templates/command');

class PingCommand extends Command {
    constructor() {
        super(new CommandInfo('ping', 'It uh pings....', 'ping'));
    }

    async run(client, message) {
        const pingMessage = await message.channel.send('Ping?');
        pingMessage.edit('xd I pinged'); //TODO: Copy this crap/
    }
}

module.exports = PingCommand;