import Global from './Global';

export default class Form extends Global
{
    constructor (page)
    {
        super(page);

        this.selectors = {
            saveButton: '#save',
            deleteButton: '#delete',
            deleteWrapper: '#delete-wrapper'
        };

        this.ajaxOfSaveOne = {
            url: String,
            method: 'POST'
        };
        this.ajaxOfEditOne = {
            url: String,
            method: 'PUT'
        };
        this.ajaxOfDeleteOne = {
            url: String,
            method: 'DELETE'
        };
    }

    init (setValues)
    {
        this.q(this.selectorOfTitle).innerHTML = this.page.data.title;


        let listenerOfSaveButtonClick = this.setNewItem.bind(this); //this is default
        if (this.page.data.title === this.page.data.titleOfEdit && typeof this.page.data.item === 'object')
        {
            setValues();
            listenerOfSaveButtonClick = this.editItem.bind(this); //if wanna

            this.setUpDeleteButton();
        }

        this.q(this.selectors.saveButton).addEventListener('click', () => listenerOfSaveButtonClick());
    }

    setNewItem (data)
    {
        this.ajax({
            method: this.ajaxOfSaveOne.method,
            url: this.ajaxOfSaveOne.url,
            data: data,
            success: (response) =>
            {
                if (response)
                {
                    this.pushBackWithRefresh();
                }
            }
        });
    }

    setValues () {}

    editItem (data)
    {
        this.ajax({
            method: this.ajaxOfEditOne.method,
            url: this.ajaxOfEditOne.url,
            data: data,
            success: (response) =>
            {
                if (response)
                {
                    this.pushBackWithRefresh();
                }
            }
        });
    }

    setUpDeleteButton ()
    {
        console.log(this.selectors.deleteWrapper);
        this.setDomElement({
            where: this.selectors.deleteWrapper,
            html: '<ons-button modifier="large" id="delete" class="red">Delete</ons-button>',
            callback: () =>
            {
                this.q(this.selectors.deleteButton).addEventListener('click', () =>
                {
                    const id = this.page.data.item._id;

                    this.ajax({
                        method: this.ajaxOfDeleteOne.method,
                        url: this.ajaxOfDeleteOne.url,
                        data: {id: id},
                        success: () =>
                        {
                            this.pushBackWithRefresh();
                        }
                    });
                });
            }
        });
    }
}