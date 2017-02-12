function MongoDB()
{
    var MongoClient = require('mongodb').MongoClient,
        assert = require('assert');

    var url = 'mongodb://localhost:27017/learnwords';

    function connect(callback)
    {
        MongoClient.connect(url, function(err, db)
        {
            if (err) throw err;
            assert.equal(null, err);


            callback(db, function ()
            {
                db.close();
            });
        });
    }


    this.findName = function (name, callback)
    {
        connect(function (db, programCallback)
        {
            finding(function (result)
            {
                if (result)
                {
                    return callback(result, programCallback)
                }

                db.collection('names').insertOne({name: name}, function ()
                {
                    finding(function (result)
                    {
                        return callback(result, programCallback);
                    })
                });
            });

            function finding(callback)
            {
                db.collection('names').findOne({name: name}, function (err, result)
                {
                    if (err) throw err;

                    callback(result);
                });
            }
        });
    };
}

module.exports = MongoDB;