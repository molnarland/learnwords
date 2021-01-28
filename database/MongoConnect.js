const mongo = require('mongodb');
const assert = require('assert');

class MongoConnect
{
    constructor ()
    {
        this.MongoClient = mongo.MongoClient;
        this.url = 'mongodb://localhost:27017/learnwords';
    }

	/**
	 * @return {Promise<Db, function>}
	 */
	connect ()
	{
		return new Promise((resolve) =>
		{
			this.MongoClient.connect(this.url, { useUnifiedTopology: true }, (err, db) =>
			{
				if (err)
				{
					throw err;
				}

				assert.equal(null, err);

				resolve({
					db: db.db(),
					programCallback: () =>
					{
						db.close();
					}
				});
			});
		});
	}

    /**
     * @param {string} id
     * @return {*}
     */
    objectId (id)
    {
        return mongo.ObjectID(id);
    }
}

module.exports = MongoConnect;