const DB = require('./DB');
const Model = require('../model/Label');

class Label extends DB
{
    constructor ()
    {
        super();

        this.table = 'labels';
    }

    insertOne (userId, name, callback)
    {
        const label = new Model(userId, name);

        super.insertOne(this.table, label, callback);
    }

    getAll (userId, callback)
    {
        super.getAll(this.table, callback, {userId: userId});
    }

    updateOne (userId, oldName, newName, callback)
    {
        const oldLabel = new Model(userId, oldName);
        const newLabel = new Model(userId, newName);

        super.updateOne(this.table, oldLabel, { $set: newLabel }, callback);
    }

    deleteById (id, callback)
    {
        super.deleteById(this.table, id, callback);
    }
}

module.exports = Label;