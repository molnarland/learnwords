import Game from './Game';
import ons from 'onsenui';

export default class Learn extends Game
{
    constructor (page)
    {
        super(page);

        this.ajaxOfGetWordsForLearn = {
            url: `${this.urlOfGameMethods}/{label}/{sort}/{first}`,
            method: 'GET'
        };

        this.currentPageName = 'learn';
        this.selectorOfProgressBar = '#progress';
        this.selectorOfProgramArea = '#learn-area';
        this.selectorOfBackButtonWhenNoResult = '#back-to-settings';
        this.selectorOfNextButton = '#next';
        this.learnable = {
            selector: '#learnable',
            spaceOfWord: '#learnable .card p',
            image: '#learnable img'
        };
        this.native = {
            selector: '#native',
            spaceOfWord: '#native .card p',
            image: '#native img'
        };

        this.animationDelay = 400; //millisecond

        //from previous page
        const data = this.page.data.data;
        this.label = data.label;
        this.sort = data.sort;
        this.showBoth = data.showBoth;
        this.showFirst = Number(data.showFirst);
        this.loop = data.loop;

        //for learn
        this.words = [];
        this.index = 0;
        this.progressRate = null;


        this.getWords();
        this.addLearnClassToContentWrapper();
    }


    getWords ()
    {
        this.ajax({
            method: this.ajaxOfGetWordsForLearn.method,
            url: `${this.ajaxOfGetWordsForLearn.url}/`,
            data: {
                label: this.label,
                sort: this.sort,
                first: this.showFirst
            },
            success: (response) =>
            {
                if (response && response.length > 0)
                {
                    this.words = response;
                    this.progressRate = this._getProgressRate();
                    this._startTheLearn();
                }
                else
                {
                    this._setNoResult();
                }
            }
        })
    }

    /**
     * @return {*}
     * @private
     */
    _startTheLearn ()
    {
        if (this.words.length <= 0)
        {
            return this._setNoResult();
        }

        this.first();
    }

    first ()
    {
        this._setProgressValue();

        this._setLearnContentTemplate(this.getLearnContentSelector(), () =>
        {
            setTimeout(this._nextWord.bind(this), 300);
            this._setNextContent();
        });


        this.q(this.selectorOfNextButton).addEventListener('click', this.next.bind(this));
    }

    /**
     * Event listener of next button
     */
    next ()
    {
        this.disableNextButton();

        this.index++;

        this._setProgressValue();

        this._deletePreviousContent();
        this._setCurrentContent();

        if (this.words[this.index+1])
        {
            this._setNextContent();
        }
        else
        {
            if (this.loop)
            {
                this.index = -1;
                this._setNextContent();
            }
            else
            {
                this.hideNextButton();
            }
        }
    }

    _deletePreviousContent ()
    {
        let previous = this.q(this.getLearnContentSelector(false));

        previous.classList.add('go-away');

        setTimeout(() =>
        {
            //TODO parentNode is null when showBoth is true
            previous.parentNode.removeChild(previous);
        }, this.animationDelay)
    }

    _setCurrentContent ()
    {
        this._nextWord();

        let currentContent = this.q(this.getLearnContentSelector());
        currentContent.classList.remove('hidden');
        currentContent.classList.add('come-here');

        setTimeout(() =>
        {
            this.enableNextButton();

            currentContent.classList.remove('come-here');
        }, this.animationDelay);
    }

    _setNextContent ()
    {
        this._setLearnContentTemplate(this.getLearnContentSelector(true) + ' hidden');
    }

    /**
     * @private
     */
    _nextWord ()
    {
        const word = this.words[this.index];
        const native = word.native;
        const learnable = word.learnable;
        const photo = word.photo;

        let currentContentSelector = this.getLearnContentSelector() + ' ';

        this.q(currentContentSelector + this.native.spaceOfWord).innerText = native;
        this.q(currentContentSelector + this.learnable.spaceOfWord).innerText = learnable;
        if (photo)
        {
            this.q(currentContentSelector + this.native.image).src = photo;
            this.q(currentContentSelector + this.learnable.image).src = photo;
        }
	}


    /**
     * @private
     */
    _setNoResult ()
    {
        this.setDomElement({
            where: this.selectorOfProgramArea,
            html:   '<p>So sorry, but I didn\'t find any words with those settings...</p>' +
                    '<p>' +
                        '<ons-button id="back-to-settings">' +
                            '<ons-icon icon="ion-arrow-left-c, material:md-arrow-left"></ons-icon>' +
                            'Back' +
                        '</ons-button>' +
                    '</p>',
            callback: this._setBackButtonListener.bind(this)
        });

        this.q(this.selectorOfNextButton).className = 'hidden';
    }

    /**
     * @private
     */
    _setBackButtonListener ()
    {
        this.q(this.selectorOfBackButtonWhenNoResult).addEventListener('click', () =>
        {
            this.pushBack();
        });
    }

    /**
     * progress bar will be closer to toolbar
     */
    addLearnClassToContentWrapper ()
    {
        const contentWrapper = '.page__content';
        const learnClass = 'learn';

        this.q(contentWrapper).classList.add(learnClass);
    }

    /**
     * @param {boolean|null} index
     *      false - previous index
     *      null - current index
     *      true - next index
     * @return {string}
     */
    getLearnContentSelector (index = null)
    {
        const basic = '.tabbar-';

        switch (index)
        {
            case null:
            default:
                return basic + this.index;
                break;
            case false:
                let previousIndex = this.index - 1;
                if (previousIndex < 0)
                {
                    previousIndex = this.words.length - 1;
                }
                return basic + previousIndex;
                break;
            case true:
                let nextIndex = this.index + 1;
                if (nextIndex >= this.words.length)
                {
                    nextIndex = 0;
                }
                return basic + nextIndex;
                break;

        }
    }

    /**
     * @param {string} cssClass
     * @param {function} [callback]
     * @private
     */
    _setLearnContentTemplate (cssClass, callback = new Function())
    {
        cssClass = (cssClass.charAt(0) === '.') ? cssClass.substring(1) : cssClass;
        let html = '';

        if (this.showBoth)
        {
            html =
                `<div class="word-container ${cssClass}">` +
                    `<div id="${(this.showFirst === 0) ? 'native' : 'learnable'}">` +
                        `<div class="card">` +
                            `<p></p>` +
                        `</div>` +
                    `</div>` +
                    `<div id="${(this.showFirst === 1) ? 'native' : 'learnable'}">` +
                        `<div class="card">` +
                            `<p></p>` +
                        `</div>` +
                        `<img>` +
                    `</div>` +
                `</div>`;
        }
        else
        {
            html = this.createOnsElement(
                `<ons-tabbar class="word-container ${cssClass}" animation="fade">` +
                    `<ons-tab label="Native" page="native" ${(this.showFirst === 0) ? 'active' : ''}></ons-tab>` +
                    `<ons-tab label="Learnable" page="learnable" ${(this.showFirst === 1) ? 'active' : ''}></ons-tab>` +
                `</ons-tabbar>`
            );
        }

        this.setDomElement({
            where: this.selectorOfProgramArea,
            html: html,
            callback: callback
        });
    }

    /**
     * @return {number}
     * @private
     */
    _getProgressRate ()
    {
        return 100 / this.words.length;
    }

    /**
     * @private
     */
    _setProgressValue ()
    {
        this.q(this.selectorOfProgressBar).value = this.progressRate * (this.index + 1);
    }

    /**
     * @private
     */
    _hideNextButton ()
    {
        this.q(this.selectorOfNextButton).className = 'hidden';
    }

    disableNextButton ()
    {
        this.q(this.selectorOfNextButton).setAttribute('disabled', '');
    }

    enableNextButton ()
    {
        this.q(this.selectorOfNextButton).removeAttribute('disabled');
    }
}
