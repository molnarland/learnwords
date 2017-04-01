import Listing from './Listing';

export default class ListWords extends Listing
{
    constructor (page)
    {
        super(page);

        this.plusButton = '#plus-word';
        this.changeForm = 'change-words-form';

        this.titleOfNewForm = 'New word';
        this.titleOfEditForm = 'Edit word';

        this.selectorOfList = '#change-words-items';
        this.selectorOfChangeItem = `${this.selectorOfList} ons-list-item`;

        this.ajaxOfGetAll = {
            url: `${this.urlOfWordMethods}/`,
            method: 'GET'
        };

        this.init();
    }

    init ()
    {
        this.initOfPushToForm();
        this.showItems();
    }

    showItems ()
    {
        super.showItems({
            showableHtml: (word) =>
            {
                const id = word._id;
                const native = word.native;
                const learnable = word.learnable;

                return this.createOnsElement(
                    `<ons-list-item data-id=${id} tappable modifier="longdivider">
                        <div class="left">${native}</div>
                        <div class="center"><ons-icon icon="arrows-h"></ons-icon></div>
                        <div class="right">${learnable}</div>
                    </ons-list-item>`
                );
            },
            store: 'words'
        });
    }

/*    initOfPushToForm ()
    {
        this.q(this.plusWordButton).addEventListener('click', () =>
        {
            this.pushPage(this.changeWordsForm, {title: this.titleOfNewWordsForm});
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
                    `<ons-list-item data-id=${id} tappable modifier="longdivider">
                        <div class="left">${native}</div>
                        <div class="center"><ons-icon icon="arrows-h"></ons-icon></div>
                        <div class="right">${learnable}</div>
                    </ons-list-item>`
                );
            },
            store: 'words',
            after: () =>
            {
                const clickableItems = this.qAll(this.selectorOfChangeItem);
                for (let clickableItem of clickableItems)
                {
                    clickableItem.addEventListener('click', () =>
                    {
                        this.pushPage(this.changeWordsForm, {
                            title: this.titleOfEditWordForm,
                            item: window.words.find((word) => word._id == clickableItem.dataset.id)
                        }, 'lift');
                    });
                }
            }
        })
    }

    /!**
     * Send 'titleOfNewWordsForm' and 'titleOfEditWordForm' arguments to next page automatically
     * as titleOfNew and titleOfEdit
     *
     * @param {string} where
     * @param {object} data
     * @param {string} animation
     *!/
    pushPage (where, data = {}, animation = '')
    {
        data.titleOfNew = this.titleOfNewWordsForm;
        data.titleOfEdit = this.titleOfEditWordForm;

        super.pushPage(where, data, animation);
    }*/
}