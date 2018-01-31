const DB = require('./DB');
const Model = require('../model/User');

class User extends DB
{
    constructor ()
    {
        super();

        this.table = 'names';
    }

    findUserMaybeInsert (name, password, callback)
    {
        this.getOne(name, password, (result) =>
        {
            if (result)
            {
                return callback(result)
            }

            this.insertOnlyNameAndPassword(name, password, () =>
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

    getOneWithPassword (name, password, callback)
    {
        const user = new Model(name, password);

        super.getOne(this.table, user, callback);
    }

    insertOne (name, password, native, learnable, callback)
    {
        const user = new Model(name, password, native, learnable);

        console.log(user);
        super.insertOne(this.table, user, callback);
    };

    insertOnlyNameAndPassword (name, password, callback)
    {
        const user = new Model(name, password);

        super.insertOne(this.table, user, callback);
    }
}

module.exports = User;