const DB = require('./DB');
const Model = require('../model/Word');

class Word extends DB
{
    constructor ()
    {
        super();

        this.table = 'words';
    }

    getAllWords (userId, callback)
    {
        const word = new Model(userId);

        this.getAll(this.table, callback, word.getUserId());
    }

    insertWord (userId, native, learnable, photo, labelId, callback)
    {
        const word = new Model(userId, native, learnable, labelId, photo);

        this.insertOne(this.table, word, callback);
    }
}

module.exports = Word;