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
        this.urlOfEditOneLabel = '/update-label';

        this.init();
    }

    init ()
    {
        this.page.querySelector('ons-toolbar .center').innerHTML = this.page.data.title;

        let listenerOfSabeButtonClick = this.setNewLabel.bind(this); //this is default
        if (this.page.data.title === this.page.data.titleOfEdit && typeof this.page.data.item === 'object')
        {
            this.page.querySelector(this.labelInput).value = this.page.data.item.name;
            listenerOfSabeButtonClick = this.editLabel.bind(this); //if wanna edit
        }

        this.page.querySelector(this.saveButton).addEventListener('click', () => listenerOfSabeButtonClick());
    }

    setNewLabel ()
    {
        const label = this.getLabelFromInput();

        this.postAjax(this.urlOfSaveOneLabel, {label: label}, (response) =>
        {
            if (response)
            {
                this.pushBackWithRefresh();
            }
        });
    }

    editLabel ()
    {
        const userId = this.page.data.item.userId;
        const oldLabel = this.page.data.item.name;
        const editedLabel = this.getLabelFromInput();

        this.postAjax(this.urlOfEditOneLabel, {
            userId: userId,
            oldLabel: oldLabel,
            newLabel: editedLabel
        }, (response) =>
        {
            console.log(response);
            if (response)
            {
                this.pushBackWithRefresh();
            }
        });
    }



    getLabelFromInput ()
    {
        return this.page.querySelector(this.labelInput).value;
    }

    pushBackWithRefresh ()
    {
        document.querySelector(this.selectorOfNavigator).popPage({refresh: true});
    }
}