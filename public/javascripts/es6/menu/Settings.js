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

    /**
     * @param {object} dataForPush
     */
    init (dataForPush)
    {
        this.getLabelsForSelect(this.selectorOfLabelInput);
        this.initOfPushToGame(dataForPush);
    }

    /**
     * @param {object} data
     */
    initOfPushToGame (data)
    {
        this.q(this.nextButton).addEventListener('click', () =>
        {
            this.pushPage(this.changeForm, { data: datas });
        });
    }
}