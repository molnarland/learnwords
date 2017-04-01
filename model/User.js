class User
{
    /**
     * @param {string} name
     * @param {string} [native]
     * @param {string} [learnable]
     * @param {string} [_id]
     */
    constructor (name, native = null, learnable = null, _id = null)
    {
        this.name = name;

        if (native) this.native = native;
        if (learnable) this.learnable = learnable;
        if (_id) this._id = _id;
    }
}

module.exports = User;