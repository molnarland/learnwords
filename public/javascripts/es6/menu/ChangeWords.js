import Global from './Global';

export default class ChangeWords extends Global
{
    constructor(page)
    {
        super();

        this.plusWordButton = '#plus-word';
        this.changeWordsForm = 'change-words-form';
        this.titleOfChangeWordsForm = 'New word';

        this.q(this.plusWordButton).addEventListener('click', () =>
        {
            document.querySelector(this.selectorOfNavigator).pushPage(this.changeWordsForm, {
                data: {title: this.titleOfChangeWordsForm}
            });
        });
    }
}