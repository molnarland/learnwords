const Model = require('./Model');

class Word extends Model
{
    /**
     * @param {string} [userId]
     * @param {string} native
     * @param {string} learnable
     * @param {string} labelId
     * @param {string} [photo]
     * @param {string} [_id]
     */
    constructor (userId, native, learnable, labelId, photo = null, _id = null)
    {
        super(_id);

        if (userId) this.userId = userId;
        this.native = native;
        this.learnable = learnable;
        this.labelId = labelId;
        if (photo) this.photo = photo;
    }
}

module.exports = Word;