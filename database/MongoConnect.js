class MongoConnect
{
    constructor ()
    {
        this.mongo = require('mongodb');
        this.MongoClient = this.mongo.MongoClient;
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

    /**
     * @param {string} id
     * @return {*}
     */
    objectId (id)
    {
        return this.mongo.ObjectID(id);
    }
}

module.exports = MongoConnect;