import Template from './Template';
import Navigator from './Navigator';


// new CustomEvent()

export default class Framework
{
    /**
     * @param {function} pushPage
     */
    constructor ({pushPage})
    {
        this.pushPage = pushPage;

        this.validate();


        this.template = new Template();

        this.navigator = new Navigator({
            getTemplate: this.template.get.bind(this.template),
            pushPageCallback: pushPage
        });
    }

    validate ()
    {
        if (!typeof this.pushPage === 'function')
        {
            console.warn('pushPage isn\'t function');
        }
    }
}