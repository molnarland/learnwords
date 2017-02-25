import Global from './Global';

export default class ChangeLabelsForm extends Global
{
    constructor(page)
    {
        super(page);

        this.labelInput = '#label';
        this.saveButton = '#save';

        this.urlOfSaveOneLabel = '/save-label';


        this.page.querySelector(this.saveButton).addEventListener('click', () =>
        {
            const label = document.querySelector(this.labelInput).value;

            this.postAjax(this.urlOfSaveOneLabel, {label: label}, (response) =>
            {
                if (response)
                {
                    this.page.querySelector(this.backButton).click();
                }
            });
        });
    }
}