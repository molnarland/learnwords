const DB = require('./DB');

class Word extends DB
{
    constructor ()
    {
        super();

        this.table = 'words';
    }

    getAllWords (userId, callback)
    {
        this.getAll(this.table, callback, {userId: userId});
    }

    insertWord (userId, native, learnable, photo, labelId, callback)
    {
        this.insertOne(this.table, {
            userId: userId,
            native: native,
            learnable: learnable,
            photo: photo,
            labelId: labelId
        }, callback);
    }
}

module.exports = Word;