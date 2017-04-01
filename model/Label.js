class Label
{
    /**
     * @param {string} userId
     * @param {string} name
     * @param {string} [_id]
     */
    constructor (userId, name, _id = null)
    {
        this.userId = userId;
        this.name = name;

        if (_id)
        {
            this._id = _id;
        }
    }
}

module.exports = Label;