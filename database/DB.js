const MongoConnect = require('./MongoConnect');

class DB extends MongoConnect
{
    constructor ()
    {
        super();
    }

    /**
     * @param {string} table
     * @param {function} callback
     * @param {object} object
     */
    getAll (table, callback, object = {})
    {
        this.connect((db, programCallback) =>
        {
            db.collection(table).find(object).toArray((err, docs) =>
            {
                if (err) {throw err;}

                programCallback();
                return callback(docs);
            });
        });
    }

    /**
     * @param {string} table
     * @param {object} object
     * @param {function} callback
     */
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

    /**
     *
     * @param {string} table
     * @param {object} object
     * @param {function} callback
     */
    getOne (table, object, callback)
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

    /**
     * @param {string} table
     * @param {object} filter
     * @param {object} update
     * @param {function} callback
     */
    updateOne (table, filter, update, callback)
    {
        this.connect((db, programCallback) =>
        {
            db.collection(table).updateOne(filter, update, (err, result) =>
            {
                if (err) {throw err;}

                programCallback();
                return callback(result);
            });
        })
    }

    /**
     * @param {string} table
     * @param {string} id
     * @param {function} callback
     */
    deleteById (table, id, callback)
    {
        this.connect((db, programCallback) =>
        {
            db.collection(table).deleteOne({_id: this.objectId(id)}, (err, result) =>
            {
                if (err) {throw err;}

                programCallback();
                return callback(result);
            })
        })
    }
}

module.exports = DB;