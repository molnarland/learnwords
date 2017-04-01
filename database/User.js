const DB = require('./DB');
const Model = require('../model/User');

class User extends DB
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
        const user = new Model(name);

        this.getOne(this.table, user, callback)
    };

    insertNameWithDatas (name, native, learnable, callback)
    {
        const user = new Model(name, native, learnable);

        this.insertOne(this.table, user, callback);
    };

    insertOnlyName (name, callback)
    {
        const user = new Model(name);

        this.insertOne(this.table, user, callback);
    }
}

module.exports = User;