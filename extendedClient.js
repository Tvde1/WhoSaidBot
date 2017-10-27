const { Client } = require('discord.js');
const tvde1logger = require('tvde1logger');
const Utils = require('./helpers/utils');
const DatabaseUtils = require('./helpers/databaseUtils');

class ExtendedClient extends Client {
    constructor(config) {
        super();

        this._config = config;

        this._logger       = new tvde1logger('WhoSaidBot', !process.env.DONTLOGTIME);
        this._utils        = new Utils();
        this._databaseUils = new DatabaseUtils(config.database.url);
    }

    get logger() {
        return this._logger;
    }

    get utils() {
        return this._utils;
    }
}

module.exports = ExtendedClient;