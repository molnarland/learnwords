import Global from './../Global';

export default class Form extends Global
{
    constructor (page)
    {
        super(page);

        /**
         * @property SELECTORS
         * @type {{SAVE_BUTTON: string, DELETE_BUTTON: string, DELETE_WRAPPER: string}}
         * @const
         */
        this.SELECTORS = {
            SAVE_BUTTON: '#save',
            DELETE_BUTTON: '#delete',
            DELETE_WRAPPER: '#delete-wrapper'
        };

        /**
         * @property ajaxOfSaveOne
         * @type {{url: String, method: string}}
         * @protected
         */
        this.ajaxOfSaveOne = {
            url: String,
            method: 'POST'
        };
        /**
         * @property ajaxOfEditOne
         * @type {{url: String, method: string}}
         * @protected
         */
        this.ajaxOfEditOne = {
            url: String,
            method: 'PUT'
        };
        /**
         * @property ajaxOfDeleteOne
         * @type {{url: String, method: string}}
         * @protected
         */
        this.ajaxOfDeleteOne = {
            url: String,
            method: 'DELETE'
        };
    }


    /**
     * @desc Mainly look and choose setNewItem or editItem
     */
    init ()
    {
        this.q(this.SELECTOR_OF_TITLE).innerHTML = this.page.data.title;

        let listenerOfSaveButtonClick = this.setNewItem.bind(this); //this is default
        if (this.page.data.title === this.page.data.titleOfEdit && typeof this.page.data.item === 'object')
        {
            this.setValues();
            listenerOfSaveButtonClick = this.editItem.bind(this); //if wanna

            this.setUpDeleteButton();
        }


        this.q(this.SELECTORS.SAVE_BUTTON).addEventListener('click', () => listenerOfSaveButtonClick());
    }

    /**
     * @desc Show error and return false in callback if now valid otherwise return true
     *
     * @param {array} selectors
     * @param {function} callback
     * @return {boolean|function}
     */
    validate (selectors, callback)
    {
        let valid = true;

        for (const selector of selectors)
        {
            let input = this.q(selector);

            if (input.value)
            {
                delete input.dataset.error;
            }
            else
            {
                input.dataset.error = 'Have to be filled';
                valid = false;
            }
        }

        if (valid)
        {
            return callback(valid);
        }

        return false;
    }

    /**
     * @param {function} [before]
     * @param {object} data
     */
    setNewItem ({before = new Function(), data})
    {
        before();

        this.ajax({
            method: this.ajaxOfSaveOne.METHOD,
            url: this.ajaxOfSaveOne.URL,
            data: data,
            success: (response) =>
            {
                if (response)
                {
                    this.pushBackWithRefresh();
                }
            }
        });
    }

    /**
     * @desc Default values
     */
    setValues () {}

    /**
     * @param {object} data
     */
    editItem (data)
    {
        this.ajax({
            method: this.ajaxOfEditOne.METHOD,
            url: this.ajaxOfEditOne.URL,
            data: data,
            success: (response) =>
            {
                if (response)
                {
                    this.pushBackWithRefresh();
                }
            }
        });
    }

    setUpDeleteButton ()
    {
        this.setDomElement({
            where: this.SELECTORS.DELETE_WRAPPER,
            html: '<ons-button modifier="large" id="delete" class="red">Delete</ons-button>',
            callback: () =>
            {
                this.q(this.SELECTORS.DELETE_BUTTON).addEventListener('click', this.deleteItem.bind(this));
            }
        });
    }

    deleteItem ()
    {
        const id = this.page.data.item._id;

        this.ajax({
            method: this.ajaxOfDeleteOne.METHOD,
            url: this.ajaxOfDeleteOne.URL,
            data: {id: id},
            success: () =>
            {
                this.pushBackWithRefresh();
            }
        });
    }
}