const ExtendedClient = require('../extendedClient'); //eslint-disable-line no-unused-vars
const natural        = require('natural');
// const svm            = require('svm');


class PredictionClient {
    /**
     * 
     * @param {ExtendedClient} client 
     */
    constructor(client) {
        this._client = client;
    }

    async predict(text, guildid) {
        const tfidf = new natural.TfIdf();
        const messages = await this._client.databaseClient.getMessagesFromGuild(guildid);

        const authorArray = [];
        for (let message of messages) {
            authorArray.push(message.author);
            tfidf.addDocument(message.text, message.author);
        }

        // const data = [];

        const dataPoints = new Map();

        tfidf.tfidfs(text, (i, measure) => {  
            if (dataPoints.has(authorArray[i])) {
                const newArray = dataPoints.get(authorArray[i]);
                newArray.push(measure);
                dataPoints.set(authorArray[i], newArray);
            } else {
                dataPoints.set(authorArray[i], [measure]);
            }
            // data.push([measure, authorArray[i]]);
        });


        let maxPerson;
        let maxAvg = 0;
        for (let person of dataPoints) {
            let avg = person[1].reduce((previous, current) => current += previous) / [person[1]].length;
            
            if (avg > maxAvg) {
                maxAvg = avg;
                maxPerson = person[0];
            }
        }

        return maxPerson;
    }

    load() {

    }
    
    save() {

    }

    refreshModel() {
        
    }

    //TODO: Finish xd
}

module.exports = PredictionClient;