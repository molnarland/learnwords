class Word
{
    /**
     * @param {string} userId
     * @param {string} native
     * @param {string} learnable
     * @param {string} labelId
     * @param {string} [photo]
     */
    constructor (userId, native, learnable, labelId, photo = null)
    {
        this.userId = userId;
        this.native = native;
        this.learnable = learnable;
        this.labelId = labelId;
        if (photo) this.photo = photo;
    }

    getUserId ()
    {
        return {userId: this.userId};
    }
}

module.exports = Word;