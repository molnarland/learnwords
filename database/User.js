function User ()
{
    var MongoConnect = require('./MongoConnect');
    MongoConnect = new MongoConnect();

    var table = 'names';

    this.findNameMaybeInsert = function (name, callback)
    {
        MongoConnect.connect(function (db, programCallback)
        {
            this.findName(name, function (result)
            {
                if (result)
                {
                    programCallback();
                    return callback(result)
                }

                db.collection(table).insertOne({name: name}, function ()
                {
                    this.findName(name, function (result)
                    {
                        programCallback();
                        return callback(result);
                    });
                }.bind(this));
            });
        }.bind(this));
    };

    this.deleteAllNames = function (callback)
    {
        MongoConnect.connect(function (db, programCallback)
        {
            db.collection(table).deleteOne({name: 'molnarland'}, function (err, result)
            {
                if (err) {throw err;}

                programCallback();
                return callback(result);
            });
        });
    };

    this.findName = function (name, callback)
    {
        MongoConnect.connect(function (db, programCallback)
        {
            db.collection(table).findOne({name: name}, function (err, result)
            {
                if (err) {throw err;}

                programCallback();
                return callback(result);
            });
        });
    };

    this.insertName = function (name, native, learnable, callback)
    {
        MongoConnect.connect(function (db, programCallback)
        {
            db.collection(table).insertOne({name: name, native: native, learnable: learnable}, function (err, result)
            {
                if (err) {throw err;}

                programCallback();
                return callback(result);
            })
        });
    };
}

module.exports = User;