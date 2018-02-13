/**
 * Created by Kristian Nielsen on 12-02-2018.
 */
const MongoClient = require('mongodb').MongoClient;
const dbName = process.argv[2] || 'kn-twitter-test';
const url = process.argv[3] || 'mongodb://localhost:27017';


module.exports = function(fn){
    MongoClient.connect(url, function(err, client) {

        const db = client.db(dbName);
        const collection = db.collection('tweets');

        fn(collection, () => {
            client.close();
        });
    });
};
