import Global from './Global';

export default class Settings extends Global
{
    constructor (page)
    {
        super(page);

        this.nextButton = String;
        this.changeForm = String;

        this.selectorOfLabelInput = '#label';
    }


    init ()
    {
        this.getLabelsForSelect(this.selectorOfLabelInput);
        this.initOfPushToGame();
    }


    initOfPushToGame ()
    {
        this.q(this.nextButton).addEventListener('click', () =>
        {
            this.getValue((data) =>
            {
                this.pushPage(this.changeForm, { data: data });
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
}