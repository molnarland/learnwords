import Global from './Global';

export default class Listing extends Global
{
    constructor (page)
    {
        super(page);

        this.plusButton = String;
        this.changeForm = String;

        this.titleOfNewForm = String;
        this.titleOfEditForm = String;

        this.selectorOfList = String;
        this.selectorOfChangeItem = String;

        this.ajaxOfGetAll = {
            url: String,
            method: 'GET'
        };
    }


    showItems ({showableHtml, store})
    {
        this.downAndShow({
            url: this.ajaxOfGetAll.url,
            showWhere: this.selectorOfList,
            showableHtml: showableHtml,
            store: store,
            after: () =>
            {
                let clickableItems = this.qAll(this.selectorOfChangeItem);
                for (let clickableItem of clickableItems)
                {
                    clickableItem.addEventListener('click', () =>
                    {
                        this.pushPage(this.changeForm, {
                            title: this.titleOfEditForm,
                            item: window[store].find((item) => item._id == clickableItem.dataset.id),
                        }, 'lift');
                    });
                }
            }
        });
    }

    initOfPushToForm ()
    {
        this.page.querySelector(this.plusButton).addEventListener('click', () =>
        {
            this.pushPage(this.changeForm, { title: this.titleOfNewForm });
        });
    }

    /**
     * Send 'titleOfNewForm' and 'titleOfEditForm' arguments to next page automatically
     * as titleOfNew and titleOfEdit
     *
     * @param {string} where
     * @param {object} data
     * @param {string} animation
     */
    pushPage (where, data = {}, animation = '')
    {
        data.titleOfNew = this.titleOfNewForm;
        data.titleOfEdit = this.titleOfEditForm;

        super.pushPage(where, data, animation);
    }
}