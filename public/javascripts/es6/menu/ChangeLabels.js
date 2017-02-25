import Global from './Global';

export default class ChangeLabels extends Global
{
    constructor(page)
    {
        super(page);

        this.plusLabelButton = '#plus-label';
        this.changeLabelForm = 'change-label-form';
        this.titleOfChangeLabelsForm = 'New label';

        this.selectorOfLabelList = '#change-labels-items';
        this.urlOfGetAllLabels = '/all-labels';


        this.showLabels();
        this.initOfPushToForm();
    }

    showLabels ()
    {
        this.downAndShow({
            url: this.urlOfGetAllLabels,
            showWhere: this.selectorOfLabelList,
            showableHtml: (label) =>
            {
                const name = label.name;

                return `<p>${name}</p>`;
            }
        });
    }

    initOfPushToForm ()
    {
        this.page.querySelector(this.plusLabelButton).addEventListener('click', () =>
        {
            this.pushPage(this.changeLabelForm, { title: this.titleOfChangeLabelsForm });
        });
    }
}