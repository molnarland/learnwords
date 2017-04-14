import Settings from './Settings';
import * as Cookies from 'js-cookie';

export default class SettingsLearn extends Settings
{
    constructor (page)
    {
        super(page);

        this.nextButton = '#go-learn';
        this.changeForm = 'learn';

        this.selectorOfSort = '#sort';
        this.selectorOfLabel = '#label';
        this.selectorOfShowBoth = '#show-both';
        this.selectorOfWhichShowFirst = '#show-first';
        this.selectorOfLoop = '#loop';

        this.init();
    }

    /**
     * @param {function} callback
     */
    getValue (callback)
    {
        const data = {
            sort: this.q(this.selectorOfSort).value,
            label: this.q(this.selectorOfLabel).value,
            showBoth: this.q(this.selectorOfShowBoth).checked,
            showFirst: this.q(this.selectorOfWhichShowFirst).value,
            loop: this.q(this.selectorOfLoop).checked
        };

        return callback(data);
    }

    setDefaultValue ()
    {
        let data = Cookies.get('learn-settings');
        data = (data) ? JSON.parse(data) : {};

        this.q(this.selectorOfSort).value = data.sort || 0;
        this.q(this.selectorOfShowBoth).checked = data.showBoth || false;
        this.q(this.selectorOfWhichShowFirst).value = data.showFirst || 0;
        this.q(this.selectorOfLabel).value = data.label || 0;
        this.q(this.selectorOfLoop).checked =
            (data.loop == true || data.loop == false)
                ? data.loop
                : true; //default value want to be true
    }

    saveAsDefaultValues (data)
    {
        Cookies.set('learn-settings', JSON.stringify(data), {expires: 1000});
    }
}