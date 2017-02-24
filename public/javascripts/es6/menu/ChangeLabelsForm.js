import Global from './Global';

export default class ChangeLabelsForm extends Global
{
    constructor(page)
    {
        super();

        this.page = page;

        this.labelInput = '#label';
        this.saveButton = '#save';
        this.previousPage = 'change-labels-form';

        this.page.querySelector(this.saveButton).addEventListener('click', () =>
        {
            const label = document.querySelector(this.labelInput).value;

            this.postAjax('/save-label', {label: label}, (response) =>
            {
                //TODO if response true, back to all labels and show them
                console.log(response);
            });
        });
    }
}