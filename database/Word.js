const DB = require('./DB');
const Model = require('../model/Word');

class Word extends DB
{
    constructor ()
    {
        super();

        this.table = 'words';
    }

    getAll (userId, callback)
    {
        const word = new Model(userId);

        super.getAll(this.table, callback, word.getUserId());
    }

    getById (_id, callback)
    {
        super.getById(this.table, _id, callback);
    }

    insertOne (userId, native, learnable, photo, labelId, callback)
    {
        const word = new Model(userId, native, learnable, labelId, photo);

        super.insertOne(this.table, word, callback);
    }

    updateOne (_id, native, learnable, photo, labelId, callback)
    {
        const word = new Model(null, native, learnable, labelId, photo);

        super.updateOne(this.table, { _id: this.objectId(_id) }, { $set: word }, callback);
    }

    deleteById (_id, callback)
    {
        super.deleteById(this.table, _id, callback);
    }
}

module.exports = Word;