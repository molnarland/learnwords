function Words()
{
    var MongoConnect = require('./MongoConnect');
    MongoConnect = new MongoConnect();

    var table = 'words';

    this.getAllWords = function (callback)
    {
        MongoConnect.connect(function (db, programCallback)
        {
            db.collection(table).find().toArray(function (err, docs)
            {
                if (err) {throw err;}

                programCallback();
                return callback(docs);
            });
        });
    }
}

module.exports = Words;