import Global from './../Global';

export default class GameSettings extends Global
{
    constructor (page)
    {
        super(page);

        /**
         * @property nextButton
         * @type {String}
         * @protected
         */
        this.nextButton = String;
        /**
         * @property changeForm
         * @type {String}
         * @protected
         */
        this.changeForm = String;

        /**
         * @property SELECTOR_OF_LABEL_INPUT
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_LABEL_INPUT = '#label';
    }


    init ()
    {
        this.getLabelsForSelect(this.SELECTOR_OF_LABEL_INPUT)
            .then(this.setDefaultValue.bind(this))
            .catch(this.pushBack.bind(this));
        this.initOfPushToGame();

    }


    initOfPushToGame ()
    {
        this.q(this.nextButton).addEventListener('click', () =>
        {
            this.getValue((data) =>
            {
                this.pushPage(this.changeForm, { data: data });
                this.saveAsDefaultValues(data);
            });
        });
    }

    /**
     * @param {function} callback
     */
    getValue (callback = new Function())
    {
        return callback();
    }

    saveAsDefaultValues () {}

    setDefaultValue () {}
}