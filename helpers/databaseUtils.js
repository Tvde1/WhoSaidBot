const mongoose       = require('mongoose');
const { Connection } = mongoose; //eslint-disable-line no-unused-vars
const { Message }    = require('discord.js');  //eslint-disable-line no-unused-vars
const Logger         = require('tvde1logger'); //eslint-disable-line no-unused-vars

const messageSchema = new mongoose.Schema({
    text: String,
    author: Number,
    guildid: Number
});

const DBMessage = mongoose.model('messages', messageSchema);

class DatabaseUtils {
    /**
     * Creates a new DatabaseUtils class.
     * @param {string} dbUrl The url of the database. 
     * @param {Logger} logger The logger.
     */
    constructor(logger) {
        mongoose.Promise = global.Promise;
        this._logger     = logger;
        this._connection = mongoose.connection;
        this._isConnected  = false;

        this._connection.on('error', err => this._logger.error('Database', `Mongoose connection error: ${err.message}.`));
        this._connection.once('open', () => this._logger.log('Database', 'Connected to database.'));
    }

    /**
     * 
     * @param {string} url The database url. 
     */
    connect(url) {
        this._url = url;
        mongoose.connect(this._url, { useMongoClient: true });
    }

    /**
     * @returns {Connection} The current connection.
     */
    get connection() {
        return this._connection;
    }

    /**
     * Saves a message to the database.
     * @param {Message} message 
     */
    saveMessage(message) {
        if (!this._isConnected) {
            this._logger.log('Database', 'Requested saveMessage without connection.');
            throw new Error('Not connected.');
        }

        const dbMessage = new DBMessage({
            text: message.content,
            author: message.author.id,
            guildid: message.guild ? message.guild.id : null 
        });

        dbMessage.save();
    }
}

module.exports = DatabaseUtils;