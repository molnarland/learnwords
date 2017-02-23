const MongoConnect = require('./MongoConnect');

class Broad extends MongoConnect
{
    constructor ()
    {
        super();
    }

    getAll (table, callback)
    {
        this.connect((db, programCallback) =>
        {
            db.collection(table).find().toArray((err, docs) =>
            {
                if (err) {throw err;}

                programCallback();
                return callback(docs);
            });
        });
    }

    insertOne (table, object, callback)
    {
        this.connect((db, programCallback) =>
        {
            db.collection(table).insertOne(object, (err, result) =>
            {
                if (err) {throw err;}

                programCallback();
                return callback(result);
            })
        });
    }

    findOne (table, object, callback)
    {
        this.connect((db, programCallback) =>
        {
            db.collection(table).findOne(object, (err, result) =>
            {
                if (err) {throw err;}

                programCallback();
                return callback(result);
            });
        });
    }
}

module.exports = Broad;