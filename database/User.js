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
        this.getOne(name, (result) =>
        {
            if (result)
            {
                return callback(result)
            }

            this.insertOnlyName(name, () =>
            {
                this.getOne(name, (result) =>
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

    getOne (name, callback)
    {
        const user = new Model(name);

        super.getOne(this.table, user, callback)
    };

    insertOne (name, native, learnable, callback)
    {
        const user = new Model(name, native, learnable);

        super.insertOne(this.table, user, callback);
    };

    insertOnlyName (name, callback)
    {
        const user = new Model(name);

        super.insertOne(this.table, user, callback);
    }
}

module.exports = User;