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

        this.ajaxOfSaveOneLabel = {
            url: `${this.urlOfLabelMethods}/`,
            method: 'POST'
        };
        this.ajaxOfEditOneLabel = {
            url: `${this.urlOfLabelMethods}/`,
            method: 'PUT'
        };
        this.ajaxOfDeleteOneLabel = {
            url: `${this.urlOfLabelMethods}/`,
            method: 'DELETE'
        };

        this.init();
    }

    init ()
    {
        this.q('ons-toolbar .center').innerHTML = this.page.data.title;

        let listenerOfSabeButtonClick = this.setNewLabel.bind(this); //this is default
        if (this.page.data.title === this.page.data.titleOfEdit && typeof this.page.data.item === 'object')
        {
            this.q(this.selectorOfLabelInput).value = this.page.data.item.name;
            listenerOfSabeButtonClick = this.editLabel.bind(this); //if wanna

            this.setUpDeleteButton();
        }

        this.q(this.selectorOfSaveButton).addEventListener('click', () => listenerOfSabeButtonClick());
    }

    setNewLabel ()
    {
        const label = this.getLabelFromInput();

        this.ajax(this.ajaxOfSaveOneLabel.method, this.ajaxOfSaveOneLabel.url, {label: label}, (response) =>
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

        this.ajax(this.ajaxOfEditOneLabel.method, this.ajaxOfEditOneLabel.url, {
            userId: userId,
            oldLabel: oldLabel,
            newLabel: editedLabel
        }, (response) =>
        {
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

                    this.ajax(this.ajaxOfDeleteOneLabel.method, this.ajaxOfDeleteOneLabel.url, {id: id}, () =>
                    {
                        this.pushBackWithRefresh();
                    });
                });
            }
        });
    }

    getLabelFromInput ()
    {
        return this.q(this.selectorOfLabelInput).value;
    }

    pushBackWithRefresh ()
    {
        document.querySelector(this.selectorOfNavigator).popPage({refresh: true});
    }
}