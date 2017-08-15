export default class Navigator
{
    /**
     * @param {function} getTemplate
     * @param {function} pushPageCallback
     */
    constructor ({getTemplate, pushPageCallback})
    {
        /**
         * @type {HTMLElement}
         */
        this.navigator = document.querySelector('mr-navigator#navigator');

        /**
         * @type {function}
         * @private
         */
        this._getTemplate = getTemplate;
        /**
         * @type {function}
         * @private
         */
        this._pushPageCallback = pushPageCallback;

        this._init();
    }

    _init ()
    {
        if (!this.navigator)
        {
            throw new ReferenceError('Navigator doesn\'t exist');
        }

        this.navigator.pushPage = this.pushPage.bind(this);
        this.navigator.popPage = this.popPage.bind(this);
    }

    /**
     * @param {string} id
     * @param {object} [data]
     */
    pushPage (id, data = {})
    {
        this.navigator.appendChild(this._getTemplate(id));

        this._pushPageCallback(id, data);
    }

    /**
     * @param {object} options
     */
    popPage (options)
    {
        this.navigator.removeChild(this.navigator.lastChild);
    }
}