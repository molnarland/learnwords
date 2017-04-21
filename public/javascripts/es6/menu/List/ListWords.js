import List from './List';

export default class ListWords extends List
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
            url: `${this.URL_OF_WORD_METHODS}/`,
            method: 'GET'
        };

        this.init();
    }

    init ()
    {
        this.initOfPushToForm();
        this.showItems();
    }

    /**
     * @desc Define html each element
     */
    showItems ()
    {
        super.showItems({
            showableHtml: (word) =>
            {
                const id = word._id;
                const native = word.native;
                const learnable = word.learnable;

                return this.createOnsElement(
                    `<ons-list-item data-id=${id} tappable modifier="longdivider">` +
                        `<div class="left">${native}</div>` +
                        `<div class="center"><ons-icon icon="arrows-h"></ons-icon></div>` +
                        `<div class="right">${learnable}</div>` +
                    `</ons-list-item>`
                );
            },
            store: 'words'
        });
    }
}