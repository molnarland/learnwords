const DB = require('./DB');
const Model = require('../model/Label');

class Label extends DB
{
    constructor ()
    {
        super();

        this.table = 'labels';
    }

    insertLabel (userId, name, callback)
    {
        const label = new Model(userId, name);

        this.insertOne(this.table, label, callback);
    }

    getAllLabels (userId, callback)
    {
        this.getAll(this.table, callback, {userId: userId});
    }

    updateLabel (userId, oldName, newName, callback)
    {
        const oldLabel = new Model(userId, oldName);
        const newLabel = new Model(userId, newName);

        this.updateOne(this.table, oldLabel, { $set: newLabel }, callback);
    }

    deleteLabel (id, callback)
    {
        this.deleteById(this.table, id, callback);
    }
}

module.exports = Label;