import Global from './Global';

/**
 * @param {string} style - Can be: light (default), dark
 * @param {string} colour - Can be: red, orange, yellow, green, teal-blue, blue (default), purple, pink
 */
export default class Settings extends Global
{
    constructor (page)
    {
        super(page);

        /**
         * @property SELECTOR_OF_STYLE
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_STYLE = '#style';
        /**
         * @property SELECTOR_OF_COLOUR
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_COLOUR = '#colour';
        /**
         * @property SELECTOR_OF_SAVE_BUTTON
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_SAVE_BUTTON = '#save';

        this.init();
    }

    init ()
    {
        this.setDefaultValues();
        this.styleChange();
        this.colourChange();
        this.save();
        this.pushBack();
    }


    setDefaultValues ()
    {
        this.q(this.SELECTOR_OF_STYLE).value = Cookies.get(this.COOKIE_NAME_OF_STYLE);
        this.q(this.SELECTOR_OF_COLOUR).value = Cookies.get(this.COOKIE_NAME_OF_COLOUR);
    }

    styleChange ()
    {
        this._addChangeListener(this.SELECTOR_OF_STYLE, 'style');
    }

    colourChange ()
    {
        this._addChangeListener(this.SELECTOR_OF_COLOUR, 'colour');
    }

    save ()
    {
        this.q(this.SELECTOR_OF_SAVE_BUTTON).addEventListener('click', () =>
        {
            this.setCookie(this.COOKIE_NAME_OF_STYLE, this.q(this.SELECTOR_OF_STYLE).value);
            this.setCookie(this.COOKIE_NAME_OF_COLOUR, this.q(this.SELECTOR_OF_COLOUR).value);
        });
    }

    pushBack ()
    {
        this.q(this.BACK_BUTTON).addEventListener('click', () =>
        {
            super.pushBackWithRefresh();
        });
    }

    /**
     * @param {string} selector
     * @param {string} dataset
     * @private
     */
    _addChangeListener (selector, dataset)
    {
        this.q(selector).addEventListener('change', (event) =>
        {
            document.querySelector('html').dataset[dataset] = event.target.value;
        });
    }
}