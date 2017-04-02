const Model = require('./Model');

class Label extends Model
{
    /**
     * @param {string} userId
     * @param {string} name
     * @param {string} [_id]
     */
    constructor (userId, name, _id = null)
    {
        super(_id);

        this.userId = userId;
        this.name = name;
    }
}

module.exports = Label;