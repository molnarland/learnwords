import Global from './Global';

export default class ChangeWords extends Global
{
    constructor(page)
    {
        super(page);

        this.plusWordButton = '#plus-word';
        this.changeWordsForm = 'change-words-form';
        this.titleOfChangeWordsForm = 'New word';

        this.q(this.plusWordButton).addEventListener('click', () =>
        {
            this.pushPage(this.changeWordsForm, {title: this.titleOfChangeWordsForm});
        });
    }
}