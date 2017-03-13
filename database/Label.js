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

    updateLabel (userId, oldLabel, newLabel, callback)
    {
        this.updateOne(this.table, {userId: userId, name: oldLabel}, { $set: {name: newLabel} }, callback);
    }

    deleteLabel (id, callback)
    {
        this.deleteById(this.table, id, callback);
    }
}

module.exports = Label;