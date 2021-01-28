const DB = require('./DB');
const Model = require('../model/User');

class User extends DB
{
	constructor ()
	{
		super();

		this.table = 'names';
	}

	/**
	 * @param {string} name
	 * @return {Promise<object>}
	 */
	find	NameMaybeInsert (name)
	{
		return new Promise(async (resolve) =>
		{
			let result = await this.get(name);

			if (result)
			{
				return resolve(result)
			}

			await this.insertOnlyName(name);
			result = await this.get(name);

			return resolve(result);
		});
	}

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

	/**
	 * @param {string} name
	 * @return {Promise<object>}
	 */
	async get (name)
	{
		const user = new Model(name);

		return await super.getOne(this.table, user);
	};

	/**
	 * @param {string}  name
	 * @param {string}  native
	 * @param {string}  learnable
	 * @return {Promise<insertOneWriteOpResult>}
	 */
	insertOne (name, native, learnable)
	{
		return new Promise((resolve) =>
		{
			const user = new Model(name, native, learnable);

			super.insertOne(this.table, user)
				 .then(resolve);
		});
	};

	/**
	 * @param {string} name
	 * @return {Promise<insertOneWriteOpResult>}
	 */
	insertOnlyName (name)
	{
		return new Promise((resolve) =>
		{

			const user = new Model(name);

			super.insertOne(this.table, user)
				 .then(resolve);
		});
	}
}

module.exports = User;