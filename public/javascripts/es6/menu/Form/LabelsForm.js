import Form from './Form';

export default class LabelsForm extends Form
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

    /**
     * @desc Call super function and pass default selectors
     *
     * @param {function} callback
     */
    validate (callback)
    {
        super.validate([this.selectorOfLabelInput], callback);
    }

    setNewItem ()
    {
        this.validate(() =>
        {
            super.setNewItem({
                data:{
                    label: this.getLabelFromInput()
                }
            });
        });
    }

    setValues ()
    {
        this.q(this.selectorOfLabelInput).value = this.page.data.item.name;
    }

    editItem ()
    {
        this.validate(() =>
        {
            super.editItem({
                data: {
                    userId: this.page.data.item.userId,
                    oldLabel: this.page.data.item.name,
                    newLabel: this.getLabelFromInput()
                }
            });
        });
    }

    getLabelFromInput ()
    {
        return this.q(this.selectorOfLabelInput).value;
    }
}