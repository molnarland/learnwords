const Model = require('./Model');

class User extends Model
{
    /**
     * @param {string} name
     * @param {string} [password]
     * @param {string} [native]
     * @param {string} [learnable]
     * @param {string} [_id]
     */
    constructor (name, password = null, native = null, learnable = null, _id = null)
    {
        super(_id);

        this.name = name;
        if (password) this.password = password;
        if (native) this.native = native;
        if (learnable) this.learnable = learnable;
    }
}

module.exports = User;