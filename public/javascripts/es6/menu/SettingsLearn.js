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

        this.init();
    }

    init ()
    {
        const data = {
            sort: this.q(this.selectorOfSort).value,
            label: this.q(this.selectorOfLabel).value,
            showBoth: this.q(this.selectorOfShowBoth).value,
            showFirst: this.q(this.selectorOfWhichShowFirst).value
        };

        super.init(data);
    }
}