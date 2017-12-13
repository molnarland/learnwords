import GameSettings from './GameSettings';
import * as Cookies from 'js-cookie';

export default class SettingsLearn extends GameSettings
{
    constructor (page)
    {
        super(page);

        this.nextButton = '#go-learn';
        this.changeForm = 'learn';

        /**
         * @property SELECTOR_OF_SORT
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_SORT = '#sort';
        /**
         * @property SELECTOR_OF_LABEL
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_LABEL = '#label';
        /**
         * @property SELECTOR_OF_SHOW_BOTH
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_SHOW_BOTH = '#show-both';
        /**
         * @property SELECTOR_OF_WHICH_SHOW_FIRST
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_WHICH_SHOW_FIRST = '#show-first';
        /**
         * @property SELECTOR_OF_LOOP
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_LOOP = '#loop';

        this.init();
    }

    /**
     * @param {function} callback
     */
    getValue (callback)
    {
        const data = {
            sort: this.q(this.SELECTOR_OF_SORT).value,
            label: this.q(this.SELECTOR_OF_LABEL).value,
            showBoth: this.q(this.SELECTOR_OF_SHOW_BOTH).checked,
            showFirst: this.q(this.SELECTOR_OF_WHICH_SHOW_FIRST).value,
            loop: this.q(this.SELECTOR_OF_LOOP).checked
        };

        return callback(data);
    }

    setDefaultValue ()
    {
        let data = Cookies.get('learn-settings');
        data = (data) ? JSON.parse(data) : {};

        this.q(this.SELECTOR_OF_SORT).value = data.sort || 0;
        this.q(this.SELECTOR_OF_SHOW_BOTH).checked = data.showBoth || false;
        this.q(this.SELECTOR_OF_WHICH_SHOW_FIRST).value = data.showFirst || 0;
        this.q(this.SELECTOR_OF_LABEL).value = data.label || 0;
        this.q(this.SELECTOR_OF_LOOP).checked =
            (data.loop == true || data.loop == false)
                ? data.loop
                : true; //default value want to be true
    }

    saveAsDefaultValues (data)
    {
        this.setCookie('learn-settings', JSON.stringify(data));
    }
}