const DB = require('./DB');
const Model = require('../model/Label');

class Label extends DB
{
    constructor ()
    {
        super();

        this.table = 'labels';
    }

	/**
     *
	 * @param {string} userId
	 * @param {string} name
	 * @return {Promise<insertOneWriteOpResult>}
	 */
	insertOne (userId, name)
	{
		return new Promise(async (resolve) =>
		{
			const label = new Model(userId, name);

			resolve(await super.insertOne(this.table, label));
		});
	}

	/**
	 * @param {string} userId
	 * @return {Promise<object>}
	 */
    getAll (userId)
    {
        return new Promise(async (resolve) => resolve(await super.getAll(this.table, {userId: userId})));
    }

	/**
     *
	 * @param {string} userId
	 * @param {string} oldName
	 * @param {string} newName
	 * @return {Promise<updateWriteOpResult>}
	 */
    updateOne (userId, oldName, newName)
	{
		return new Promise(async (resolve) =>
		{
			const oldLabel = new Model(userId, oldName);
			const newLabel = new Model(userId, newName);

			resolve(await super.updateOne(this.table, oldLabel, { $set: newLabel }));
		});
	}

	/**
	 * @param {string} id
	 * @return {Promise<deleteWriteOpResult>}
	 */
    deleteById (id)
	{
		return new Promise(async (resolve) =>
		{
			super.deleteById(this.table, id)
				 .then(resolve);
		});
	}
}

module.exports = Label;