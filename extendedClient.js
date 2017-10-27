const CommandHandler   = require('./helpers/commandHandler.js');
const DatabaseClient   = require('./helpers/databaseClient');
const PredictionClient = require('./helpers/predictionClient');
const EventHandler     = require('./helpers/eventHandler');
const tvde1logger      = require('tvde1logger');
const { Client }       = require('discord.js');
const Utils            = require('./helpers/utils');

class ExtendedClient extends Client {
    /**
     * Creates a new ExtendedClient.
     * @param {*} config The bot's config. 
     */
    constructor(config) {
        super();

        this._config = config;

        this._logger           = new tvde1logger('WhoSaidBot', !process.env.DONTLOGTIME);
        this._utils            = new Utils();
        this._databaseClient   = new DatabaseClient(this);
        this._commandHandler   = new CommandHandler(this._logger);
        this._eventHandler     = new EventHandler(this);
        this._predictionClient = new PredictionClient(this);

        this._commandHandler.load();
        this._eventHandler.load();

        this._databaseClient.connect(this._config.database.url);
    }

    /**
     * @returns {*}
     */
    get config() {
        return this._config;
    }

    /**
     * @returns {tvde1logger}
     */
    get logger() {
        return this._logger;
    }

    /**
     * @returns {Utils}
     */
    get utils() {
        return this._utils;
    }

    /**
     * @returns {DatabaseClient}
     */
    get databaseClient() {
        return this._databaseClient;
    }

    /**
     * @returns {CommandHandler}
     */
    get commandHandler() {
        return this._commandHandler;
    }

    /**
     * @returns {PredictionClient}
     */
    get predictionClient() {
        return this._predictionClient;
    }
}

module.exports = ExtendedClient;