class MongoConnect
{
    constructor ()
    {
        this.MongoClient = require('mongodb').MongoClient;
        this.assert = require('assert');

        this.url = 'mongodb://localhost:27017/learnwords';
    }

    connect (callback)
    {
        this.MongoClient.connect(this.url, (err, db) =>
        {
            if (err) throw err;
            this.assert.equal(null, err);


            callback(db, () =>
            {
                db.close();
            });
        });
    };
}

module.exports = MongoConnect;