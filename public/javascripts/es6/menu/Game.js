import Global from './Global';

export default class Game extends Global
{
    constructor (page)
    {
        super(page);

        this.urlOfGameMethods = `${this.urlOfWordMethods}/game`;
    }
}