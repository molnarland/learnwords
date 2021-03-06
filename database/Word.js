const DB = require('./DB');
const Model = require('../model/Word');

class Word extends DB
{
    constructor ()
    {
        super();

        this.table = 'words';
    }

    getAll (userId)
	{
		const word = new Model(userId);

		return new Promise(async (resolve) => resolve(await super.getAll(this.table, word.getUserId())));
	}

	/**
	 * @param {string} _id
	 * @return {Promise<object>}
	 */
    getById (_id)
    {
        return new Promise((resolve) =>
		{
			super.getById(this.table, _id)
				 .then(resolve);
		});
    }

	/**
	 * @param {string} userId
	 * @param {string} native
	 * @param {string} learnable
	 * @param {string} photo
	 * @param {string} labelId
	 * @return {Promise<insertOneWriteOpResult>}
	 */
    insertOne (userId, native, learnable, photo, labelId)
    {
		return new Promise((resolve) =>
		{
			const word = new Model(userId, native, learnable, labelId, photo);

			super.insertOne(this.table, word)
				 .then(resolve);
		});
    }

	/**
	 * @param {string} _id
	 * @param {string} native
	 * @param {string} learnable
	 * @param {string} photo
	 * @param {string} labelId
	 * @return {Promise<updateWriteOpResult>}
	 */
    updateOne (_id, native, learnable, photo, labelId)
	{
		return new Promise((resolve) =>
		{
			const word = new Model(null, native, learnable, labelId, photo);

			super.updateOne(this.table, { _id: this.objectId(_id) }, { $set: word })
				 .then(resolve);
		});
	}

	/**
	 * @param _id
	 * @return {Promise<deleteWriteOpResult>}
	 */
    deleteById (_id)
	{
		return new Promise((resolve) =>
		{
			super.deleteById(this.table, _id)
				 .then(resolve);
		});
	}

    /**
     * @param {string} userId
     * @param {string} labelId
     * @param {number} sort
     *      0 - Alphabetical
     *      1 - Reverse alphabetical
     *      2 - How uploaded
     *      3 - Reverse how uploaded
     *      4 - Random
     * @param {boolean} showFirst
     *      false - native
     *      true - learnable
	 * @return {Promise<object>}
     */
    getWithSort (userId, labelId, sort, showFirst)
	{
		return new Promise(async (resolve) =>
		{
			const criteria = this._makeUserAndLabelObject(userId, labelId);
			const sorting = this._makeSortObject(sort, showFirst);

			let results = await super.getWithShort(this.table, criteria, sorting);
			if (sort === 4)
			{
				results = global.shuffleArray(results);
			}

			return resolve(results);
		});
	}

    /**
     * @param {string} user
     * @param {string|number} label
     * @return {object}
     * @private
     */
    _makeUserAndLabelObject (user, label)
    {
        let object = { userId: user };

        if (label && label != "0")
        {
            object.labelId = label;
        }

        return object;
    }

    /**
     * @param {number} sort
     * @param {boolean} showFirst
     * @return {object}
     * @private
     */
    _makeSortObject (sort, showFirst)
    {
        let object = {};

        switch(sort)
        {
            case 0:
                object[this._getWhichWord(showFirst)] = 1;
                break;
            case 1:
                object[this._getWhichWord(showFirst)] = -1;
                break;
            case 2:
            case 4:
                object = { $natural: 1 };
                break;
            case 3:
                object = { $natural: -1 };
                break;
            default:
                break;
        }

        return object;
    }

    /**
     * @param {boolean} showFirst
     * @return {string}
     * @private
     */
    _getWhichWord (showFirst)
    {
        return (showFirst) ? 'learnable' : 'native';
    }
}

module.exports = Word;