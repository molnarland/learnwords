import Global from './../Global';

export default class List extends Global
{
    constructor (page)
    {
        super(page);

        /**
         * @property plusButton
         * @desc Push to newItem page when click it
         * @type {String}
         * @protected
         */
        this.plusButton = String;
        /**
         * @property changeForm
         * @desc newItem or editItem page,
         *       next page can be: onsen/partials/change-labels-form.pug, onsen/partials/change-words-form.
         *       value is an ID of template
         * @type {String}
         * @protected
         */
        this.changeForm = String;

        /**
         * @property titleOfNewForm
         * @type {String}
         * @protected
         */
        this.titleOfNewForm = String;
        /**
         * @property titleOfEditForm
         * @type {String}
         * @protected
         */
        this.titleOfEditForm = String;

        /**
         * @property selectorOfList
         * @type {String}
         * @protected
         */
        this.selectorOfList = String;
        /**
         * @property selectorOfChangeItem
         * @type {String}
         * @protected
         */
        this.selectorOfChangeItem = String;

        /**
         * @property ajaxOfGetAll
         * @type {{url: String, method: string}}
         * @protected
         */
        this.ajaxOfGetAll = {
            url: String,
            method: 'GET'
        };
    }


    /**
     * @desc Call Global.downAndShow() after that add click event
     *       listener each showed element what'll pass to changeForm
     *
     * @param {function} showableHtml
     * @param {string} store
     */
    showItems ({showableHtml, store})
    {
        this.downAndShow({
            method: this.ajaxOfGetAll.method,
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

    /**
     * @desc Add a click event listener to plusButton for push page to form
     *       Not called basically
     */
    initOfPushToForm ()
    {
        this.page.querySelector(this.plusButton).addEventListener('click', () =>
        {
            this.pushPage(this.changeForm, { title: this.titleOfNewForm });
        });
    }

    /**
     * @desc Send 'titleOfNewForm' and 'titleOfEditForm' arguments to next page automatically
     *       as titleOfNew and titleOfEdit
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