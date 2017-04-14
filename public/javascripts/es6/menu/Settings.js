import Global from './Global';
import * as Cookies from 'js-cookie';

export default class Settings extends Global
{
    constructor (page)
    {
        super(page);

        this.selectorOfStyle = '#style';
        this.selectorOfColour = '#colour';

        this.init();
    }

    init ()
    {
        this.styleChange();
        this.colourChange();
    }

    styleChange ()
    {
        this.addChangeListener(this.selectorOfStyle, 'style');
    }

    colourChange ()
    {
        this.addChangeListener(this.selectorOfColour, 'colour');
    }

    /**
     * @param {string} selector
     * @param {string} dataset
     */
    addChangeListener (selector, dataset)
    {
        this.q(selector).addEventListener('change', (event) =>
        {
            document.getElementsByTagName('body')[0].dataset[dataset] = event.target.value;
        });
    }
}