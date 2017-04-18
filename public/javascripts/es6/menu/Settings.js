import Global from './Global';

export default class Settings extends Global
{
    constructor (page)
    {
        super(page);

        this.selectorOfStyle = '#style';
        this.selectorOfColour = '#colour';
        this.selectorOfSaveButton = '#save';

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
        this.q(this.selectorOfStyle).value = Cookies.get(this.cookieNameOfStyle);
        this.q(this.selectorOfColour).value = Cookies.get(this.cookieNameOfColour);
    }

    styleChange ()
    {
        this._addChangeListener(this.selectorOfStyle, 'style');
    }

    colourChange ()
    {
        this._addChangeListener(this.selectorOfColour, 'colour');
    }

    save ()
    {
        this.q(this.selectorOfSaveButton).addEventListener('click', () =>
        {
            this.setCookie(this.cookieNameOfStyle, this.q(this.selectorOfStyle).value);
            this.setCookie(this.cookieNameOfColour, this.q(this.selectorOfColour).value);
        });
    }

    pushBack ()
    {
        this.q(this.backButton).addEventListener('click', () =>
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