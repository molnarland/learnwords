import Global from './Global';

export default class ChangeWords extends Global
{
    constructor (page)
    {
        super(page);

        this.plusWordButton = '#plus-word';
        this.changeWordsForm = 'change-words-form';
        this.titleOfChangeWordsForm = 'New word';

        this.selectorOfWordList = '#change-words-items';

        this.init();
    }

    init ()
    {
        this.initOfPushToForm();
        this.showWords();
    }

    initOfPushToForm ()
    {
        this.q(this.plusWordButton).addEventListener('click', () =>
        {
            this.pushPage(this.changeWordsForm, {title: this.titleOfChangeWordsForm});
        });
    }

    showWords ()
    {
        this.downAndShow({
            url: this.urlOfWordMethods,
            showWhere: this.selectorOfWordList,
            showableHtml: (word) =>
            {
                const id = word._id;
                const native = word.native;
                const learnable = word.learnable;

                return this.createOnsElement(
                    `<ons-list-item data-id=${id} tappable>
                        <div class="left">${native}</div>
                        <div class="center"><ons-icon icon="arrows-h"></ons-icon></div>
                        <div class="right">${learnable}</div>
                    </ons-list-item>`
                );
            }
        })
    }
}