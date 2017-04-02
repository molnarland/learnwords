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

    insertOne (userId, native, learnable, photo, labelId, callback)
    {
        const word = new Model(userId, native, learnable, labelId, photo);

        super.insertOne(this.table, word, callback);
    }


}

module.exports = Word;