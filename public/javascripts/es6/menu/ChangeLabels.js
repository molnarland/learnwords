import Global from './Global';

export default class ChangeLabels extends Global
{
    constructor(page)
    {
        super();

        this.plusLabelButton = '#plus-label';
        this.changeLabelForm = 'change-label-form';
        this.titleOfChangeLabelsForm = 'New label';

        page.querySelector(this.plusLabelButton).addEventListener('click', () =>
        {
            document.querySelector(this.selectorOfNavigator).pushPage(this.changeLabelForm, {
                data: {title: this.titleOfChangeLabelsForm}
            });
        });
    }
}