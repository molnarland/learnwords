const Broad = require('./Broad');

class User extends Broad
{
    constructor ()
    {
        super();

        this.table = 'names';
    }

    findNameMaybeInsert (name, callback)
    {
        this.findName(name, (result) =>
        {
            if (result)
            {
                return callback(result)
            }

            this.insertOnlyName(name, () =>
            {
                this.findName(name, (result) =>
                {
                    return callback(result);
                });
            });
        });
    };

    /*deleteAllNames (callback)
    {
        this.MongoConnect.connect((db, programCallback) =>
        {
            db.collection(this.table).deleteOne({name: 'molnarland'}, (err, result) =>
            {
                if (err) {throw err;}

                programCallback();
                return callback(result);
            });
        });
    };*/

    findName (name, callback)
    {
        this.findOne(this.table, {name: name}, callback)
    };

    insertNameWithDatas (name, native, learnable, callback)
    {
        this.insertOne(this.table, {name: name, native: native, learnable: learnable}, callback);
    };

    insertOnlyName (name, callback)
    {
        this.insertOne(this.table, {name: name}, callback);
    }
}

module.exports = User;