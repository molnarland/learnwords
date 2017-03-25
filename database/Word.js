const Broad = require('./Broad');

class Word extends Broad
{
    constructor ()
    {
        super();

        this.table = 'words';
    }

    getAllWords (callback)
    {
        this.getAll(this.table, callback);
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