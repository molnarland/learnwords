const MongoConnect = require('./MongoConnect');

class DB extends MongoConnect
{
	constructor ()
	{
		super();
	}

	/**
	 * @param {string} table
	 * @param {User|Word|Label} object
	 * @return {Promise<object>}
	 */
	getAll (table, object = {})
	{
		return new Promise(async (resolve) =>
		{
			try
			{
				const { db, programCallback } = await this.connect();
				const docs = await db.collection(table)
									 .find(object)
									 .toArray();

				programCallback();

				resolve(docs);
			}
			catch (e)
			{
				throw e;
			}
		});
	}

	/**
	 * @param {string} table
	 * @param {User|Word|Label} object
	 * @return {Promise<insertOneWriteOpResult>}
	 */
	insertOne (table, object)
	{
		return new Promise(async (resolve) =>
		{
			try
			{
				const { db, programCallback } = await this.connect();
				const result = await db.collection(table)
									   .insertOne(object);

				programCallback();

				resolve(result);
			}
			catch (e)
			{
				throw e;
			}
		});
	}

	/**
	 *
	 * @param {string} table
	 * @param {User|Word|Label} object
	 * @return {Promise<object>}
	 */
	getOne (table, object)
	{
		return new Promise(async (resolve) =>
		{
			try
			{
				const { db, programCallback } = await this.connect();
				const result = await db.collection(table)
									   .findOne(object);

				programCallback();

				resolve(result);
			}
			catch (e)
			{
				throw e;
			}
		});
	}

	/**
	 * @param {string} table
	 * @param {string} id
	 * @return {Promise<object>}
	 */
	getById (table, id)
	{
		return new Promise(async (resolve) =>
		{
			resolve(await this.getOne(table, { _id: this.objectId(id) }));
		});
	}

	/**
	 * @param {string} table
	 * @param {object} filter
	 * @param {object} update
	 * @return {Promise<updateWriteOpResult>}
	 */
	updateOne (table, filter, update)
	{
		return new Promise(async (resolve) =>
		{
			try
			{
				const { db, programCallback } = await this.connect();
				const result = await db.collection(table)
									   .updateOne(filter, update);

				programCallback();

				resolve(result);
			}
			catch (e)
			{
				throw e
			}
		});
	}

	/**
	 * @param {string} table
	 * @param {string} id
	 * @return {Promise<deleteWriteOpResult>}
	 */
	deleteById (table, id)
	{
		return new Promise(async (resolve) =>
		{
			try
			{
				const { db, programCallback } = await this.connect();
				const result = await db.collection(table)
									   .deleteOne({ _id: this.objectId(id) });

				programCallback();

				return resolve(result);
			}
			catch (e)
			{
				throw e;
			}
		});
	}

	/**
	 * @param {string} table
	 * @param {object} criteria
	 * @param {object} sort
	 * @return {Promise<object>}
	 */
	getWithShort (table, criteria, sort)
	{
		return new Promise(async (resolve) =>
		{
			try
			{
				const { db, programCallback } = await this.connect();
				const docs = db.collection(table)
							   .find(criteria)
							   .sort(sort)
							   .toArray();


				programCallback();

				resolve(docs);
			}
			catch (e)
			{
				throw e;
			}
		});
	}
}

module.exports = DB;