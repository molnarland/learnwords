import Global from './Global';
import ChangeLabels from './ChangeLabels';

export default class ChangeLabelsForm extends Global
{
    constructor(page)
    {
        super(page);

        this.selectorOfLabelInput = '#label';
        this.selectorOfSaveButton = '#save';
        this.selectorOfDeleteButton = '#delete';

        this.urlOfSaveOneLabel = '/save-label';
        this.urlOfEditOneLabel = '/update-label';
        this.urlOfDeleteOneLabel = '/delete-label';

        this.init();
    }

    init ()
    {
        this.page.querySelector('ons-toolbar .center').innerHTML = this.page.data.title;

        let listenerOfSabeButtonClick = this.setNewLabel.bind(this); //this is default
        if (this.page.data.title === this.page.data.titleOfEdit && typeof this.page.data.item === 'object')
        {
            this.page.querySelector(this.selectorOfLabelInput).value = this.page.data.item.name;
            listenerOfSabeButtonClick = this.editLabel.bind(this); //if wanna

            this.setUpDeleteButton();
        }

        this.page.querySelector(this.selectorOfSaveButton).addEventListener('click', () => listenerOfSabeButtonClick());
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

    setUpDeleteButton ()
    {

        this.setDomElement({
            where: '#delete-wrapper',
            html: '<ons-button modifier="large" id="delete" class="red">Delete</ons-button>',
            callback: () =>
            {
                this.q(this.selectorOfDeleteButton).addEventListener('click', () =>
                {
                    const id = this.page.data.item._id;

                    this.postAjax(this.urlOfDeleteOneLabel, {id: id}, () =>
                    {
                        this.pushBackWithRefresh();
                    });
                });
            }
        });
    }

    getLabelFromInput ()
    {
        return this.page.querySelector(this.selectorOfLabelInput).value;
    }

    pushBackWithRefresh ()
    {
        document.querySelector(this.selectorOfNavigator).popPage({refresh: true});
    }
}