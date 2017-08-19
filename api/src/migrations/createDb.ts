import { config } from './../config/config';

class CreateDb {
    
    // Run migration when declearing CreateDb class
    constructor () {
        let MongoClient = require('mongodb').MongoClient;

        MongoClient.connect(config.mongoDb.url, function(err, db) {
            if (err) throw err;
            console.log("Database created!");
            db.close();
        });
    }

}

new CreateDb();