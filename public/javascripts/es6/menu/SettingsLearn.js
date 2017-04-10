import Settings from './Settings';

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
            showBoth: this.convertSwitchToBoolean(this.q(this.selectorOfShowBoth).value),
            showFirst: this.q(this.selectorOfWhichShowFirst).value,
            loop: this.convertSwitchToBoolean(this.q(this.selectorOfLoop).value)
        };

        return callback(data);
    }
}