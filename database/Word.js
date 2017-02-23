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
}

module.exports = Word;