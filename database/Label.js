const Broad = require('./Broad');

class Label extends Broad
{
    constructor ()
    {
        super();

        this.table = 'labels';
    }

    insertLabel (userId, label, callback)
    {
        this.insertOne(this.table, {name: label, userId: userId}, callback);
    }

    getAllLabels (userId, callback)
    {
        this.getAll(this.table, callback, {userId: userId});
    }
}

module.exports = Label;