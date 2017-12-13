import Global from './../Global';

export default class Game extends Global
{
    constructor (page)
    {
        super(page);

        /**
         * @property URL_OF_GAME_METHODS
         * @type {string}
         * @const
         */
        this.URL_OF_GAME_METHODS = `${this.URL_OF_WORD_METHODS}/game`;
    }
}