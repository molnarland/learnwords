var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/learnwords';

function MongoConnect ()
{ }

MongoConnect.prototype.connect = function (callback)
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
};

module.exports = MongoConnect;