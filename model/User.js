const Model = require('./Model');

class User extends Model
{
    /**
     * @param {string} name
     * @param {string} [native]
     * @param {string} [learnable]
     * @param {string} [_id]
     */
    constructor (name, native = null, learnable = null, _id = null)
    {
        super(_id);

        this.name = name;
        if (native) this.native = native;
        if (learnable) this.learnable = learnable;
    }
}

module.exports = User;