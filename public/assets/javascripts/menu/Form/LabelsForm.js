import Form from './Form';

export default class LabelsForm extends Form
{
    constructor(page)
    {

        super(page);

        this.SELECTOR_OF_LABEL_INPUT = '#label';

        //CHECK @define in jsdoc
        this.ajaxOfSaveOne = {
            url: `${this.URL_OF_LABEL_METHODS}/`,
            method: 'POST'
        };
        this.ajaxOfEditOne = {
            url: `${this.URL_OF_LABEL_METHODS}/`,
            method: 'PUT'
        };
        this.ajaxOfDeleteOne = {
            url: `${this.URL_OF_LABEL_METHODS}/`,
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
        super.validate([this.SELECTOR_OF_LABEL_INPUT], callback);
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
        this.q(this.SELECTOR_OF_LABEL_INPUT).value = this.page.data.item.name;
    }

    editItem ()
    {
        this.validate(() =>
        {
            super.editItem({
                userId: this.page.data.item.userId,
                oldLabel: this.page.data.item.name,
                newLabel: this.getLabelFromInput()
            });
        });
    }

    getLabelFromInput ()
    {
        return this.q(this.SELECTOR_OF_LABEL_INPUT).value;
    }
}