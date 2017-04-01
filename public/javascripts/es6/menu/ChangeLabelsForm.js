import Form from './Form';

export default class ChangeLabelsForm extends Form
{
    constructor(page)
    {

        super(page);

        this.selectorOfLabelInput = '#label';

        this.ajaxOfSaveOne = {
            url: `${this.urlOfLabelMethods}/`,
            method: 'POST'
        };
        this.ajaxOfEditOne = {
            url: `${this.urlOfLabelMethods}/`,
            method: 'PUT'
        };
        this.ajaxOfDeleteOne = {
            url: `${this.urlOfLabelMethods}/`,
            method: 'DELETE'
        };


        this.init();
    }

    setNewItem ()
    {
        super.setNewItem({
            data:{
                label: this.getLabelFromInput()
            }
        });
    }

    setValues ()
    {
        this.q(this.selectorOfLabelInput).value = this.page.data.item.name;
    }

    editItem ()
    {
        super.editItem({
            data: {
                userId: this.page.data.item.userId,
                oldLabel: this.page.data.item.name,
                newLabel: this.getLabelFromInput()
            }
        });
    }

    /*init ()
    {
        this.q('ons-toolbar .center').innerHTML = this.page.data.title;

        let listenerOfSaveButtonClick = this.setNewLabel.bind(this); //this is default
        if (this.page.data.title === this.page.data.titleOfEdit && typeof this.page.data.item === 'object')
        {
            this.q(this.selectorOfLabelInput).value = this.page.data.item.name;
            listenerOfSaveButtonClick = this.editLabel.bind(this); //if wanna

            this.setUpDeleteButton();
        }

        this.q(this.selectorOfSaveButton).addEventListener('click', () => listenerOfSaveButtonClick());
    }*/

    /*setNewLabel ()
    {
        const label = this.getLabelFromInput();

        this.ajax({
            method: this.ajaxOfSaveOneLabel.method,
            url: this.ajaxOfSaveOneLabel.url,
            data: {label: label},
            success: (response) =>
            {
                if (response)
                {
                    this.pushBackWithRefresh();
                }
            }
        });
    }*/

    /*editLabel ()
    {
        const userId = this.page.data.item.userId;
        const oldLabel = this.page.data.item.name;
        const editedLabel = this.getLabelFromInput();

        this.ajax({
            method: this.ajaxOfEditOneLabel.method,
            url: this.ajaxOfEditOneLabel.url,
            data: {
                userId: userId,
                oldLabel: oldLabel,
                newLabel: editedLabel
            },
            success: (response) =>
            {
                if (response)
                {
                    this.pushBackWithRefresh();
                }
            }
        });
    }*/

    /*setUpDeleteButton ()
    {

        this.setDomElement({
            where: '#delete-wrapper',
            html: '<ons-button modifier="large" id="delete" class="red">Delete</ons-button>',
            callback: () =>
            {
                this.q(this.selectorOfDeleteButton).addEventListener('click', () =>
                {
                    const id = this.page.data.item._id;

                    this.ajax({
                        method: this.ajaxOfDeleteOneLabel.method,
                        url: this.ajaxOfDeleteOneLabel.url,
                        data: {id: id},
                        success: () =>
                        {
                            this.pushBackWithRefresh();
                        }
                    });
                });
            }
        });
    }*/

    getLabelFromInput ()
    {
        return this.q(this.selectorOfLabelInput).value;
    }
}