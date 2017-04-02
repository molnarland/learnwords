class Model
{
    /**
     * @param {string} [_id]
     */
    constructor (_id = null)
    {
        if (_id) this._id = _id;
    }

    getUserId ()
    {
        return (this.userId) ? {userId: this.userId} : {userId: null};
    }
}

module.exports = Model;