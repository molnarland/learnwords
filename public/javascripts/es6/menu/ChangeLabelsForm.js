import Global from './Global';
import ChangeLabels from './ChangeLabels';

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
                    document.querySelector(this.selectorOfNavigator).popPage({refresh: true});
                }
            });
        });
    }
}