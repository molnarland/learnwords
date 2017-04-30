export default class Template
{
    constructor ()
    {
        /**
         * @desc Contains innerHTML and ID of mr-templates
         * @type {object}
         */
        this._values = {};

        this._saveTemplates();
    }

    /**
     * @desc From <mr-template> cut and paste innerHTML to this.templates and delete contain of template
     * @private
     */
    _saveTemplates ()
    {
        let mrTemplates = document.getElementsByTagName('mr-template');
        for (let template of mrTemplates)
        {
            const id = template.getAttribute('id');
            this._values[id] = template.innerHTML;

            template.innerHTML = '';
        }
    }

    /**
     * @param {string} id
     * @return {string|null}
     */
    get (id)
    {
        const value = this._values[id];

        if (!value)
        {
            console.warn(`Template doesn't exist with ${id} id`);
            return null;
        }

        return value;
    }
}