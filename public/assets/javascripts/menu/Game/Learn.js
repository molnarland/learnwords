import Game from './Game';

export default class Learn extends Game
{
    constructor (page)
    {
        super(page);

        /**
         * @property AJAX_OF_GET_WORDS_FOR_LEARN
         * @type {{URL: string, METHOD: string}}
         * @const
         */
        this.AJAX_OF_GET_WORDS_FOR_LEARN = {
            URL: `${this.URL_OF_GAME_METHODS}/:label/:sort/:first`,
            METHOD: 'GET'
        };

        /**
         * @property CURRENT_PAGE_NAME
         * @type {string}
         * @const
         */
        this.CURRENT_PAGE_NAME = 'learn';
        /**
         * @property SELECTOR_OF_PROGRESS_BAR
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_PROGRESS_BAR = '#progress';
        /**
         * @property SELECTOR_OF_PROGRAM_AREA
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_PROGRAM_AREA = '#learn-area';
        /**
         * @property SELECTOR_OF_BACK_BUTTON_WHEN_NO_RESULT
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_BACK_BUTTON_WHEN_NO_RESULT = '#back-to-settings';
        /**
         * @property SELECTOR_OF_NEXT_BUTTON
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_NEXT_BUTTON = '#next';
        /**
         * @property LEARNABLE
         * @type {{SELECTOR: string, SPACE_OF_WORD: string, IMAGE: string}}
         * @const
         */
        this.LEARNABLE = {
            SELECTOR: '#learnable',
            SPACE_OF_WORD: '#learnable .card p',
            IMAGE: '#learnable img'
        };
        /**
         * @property NATIVE
         * @type {{SELECTOR: string, SPACE_OF_WORD: string, IMAGE: string}}
         * @const
         */
        this.NATIVE = {
            SELECTOR: '#native',
            SPACE_OF_WORD: '#native .card p',
            IMAGE: '#native img'
        };

        /**
         * @property animationDelay
         * @desc In millisecond for setTimeout()
         * @type {number}
         * @default 400
         */
        this.animationDelay = 400;


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
			method: this.AJAX_OF_GET_WORDS_FOR_LEARN.METHOD,
			url: `${this.AJAX_OF_GET_WORDS_FOR_LEARN.URL}/`,
			data: {
				label: this.label,
				sort: this.sort,
				first: this.showFirst
			}
		}).then((response) =>
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


        this.q(this.SELECTOR_OF_NEXT_BUTTON).addEventListener('click', this.next.bind(this));
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
        const native = word.NATIVE;
        const learnable = word.LEARNABLE;
        const photo = word.photo;

        let currentContentSelector = this.getLearnContentSelector() + ' ';

        this.q(currentContentSelector + this.NATIVE.SPACE_OF_WORD).innerText = native;
        this.q(currentContentSelector + this.LEARNABLE.SPACE_OF_WORD).innerText = learnable;
        if (photo)
        {
            let pathOfPhoto = `${this.DIRECTORY_OF_PHOTOS}/${photo}`;

            if (this.showBoth)
            {
                if (Boolean(this.showFirst)) //true -> native
                {
                    this.q(currentContentSelector + this.NATIVE.IMAGE).src = pathOfPhoto;
                }
                else //false -> learnable
                {
                    this.q(currentContentSelector + this.LEARNABLE.IMAGE).src = pathOfPhoto;
                }
            }
            else
            {
                this.q(currentContentSelector + this.NATIVE.IMAGE).src
                    = this.q(currentContentSelector + this.LEARNABLE.IMAGE).src
                    = pathOfPhoto;
            }
        }
	}


    /**
     * @private
     */
    _setNoResult ()
    {
        this.setDomElement({
            where: this.SELECTOR_OF_PROGRAM_AREA,
            html:   '<p>So sorry, but I didn\'t find any words with those settings...</p>' +
                    '<p>' +
                        '<ons-button id="back-to-settings">' +
                            '<ons-icon icon="ion-arrow-left-c, material:md-arrow-left"></ons-icon>' +
                            'Back' +
                        '</ons-button>' +
                    '</p>',
            callback: this._setBackButtonListener.bind(this)
        });

        this.q(this.SELECTOR_OF_NEXT_BUTTON).className = 'hidden';
    }

    /**
     * @private
     */
    _setBackButtonListener ()
    {
        this.q(this.SELECTOR_OF_BACK_BUTTON_WHEN_NO_RESULT).addEventListener('click', () =>
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


        let wrapper = this.q(contentWrapper);
        wrapper.classList.add(learnClass);

        if (!this.showBoth)
        {
            const notShowBothClass = 'single';

            wrapper.classList.add(notShowBothClass);
        }
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
            html = this.createOnsElement(
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
                `</div>`
            );
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
            where: this.SELECTOR_OF_PROGRAM_AREA,
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
        let result = this.progressRate * (this.index + 1);
        //TODO this is not working in firefox at !showBoth
        this.q(this.SELECTOR_OF_PROGRESS_BAR).value = result;
    }

    /**
     * @private
     */
    _hideNextButton ()
    {
        this.q(this.SELECTOR_OF_NEXT_BUTTON).className = 'hidden';
    }

    disableNextButton ()
    {
        this.q(this.SELECTOR_OF_NEXT_BUTTON).setAttribute('disabled', '');
    }

    enableNextButton ()
    {
        this.q(this.SELECTOR_OF_NEXT_BUTTON).removeAttribute('disabled');
    }
}
