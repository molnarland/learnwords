import ons from 'onsenui';

export default class Global
{
    constructor(page)
    {
        this.page = page;

        /**
         * @property SELECTOR_OF_NAVIGATOR
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_NAVIGATOR = '#navigator';
        /**
         * @property SELECTOR_OF_TITLE
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_TITLE = 'ons-toolbar .center';
        /**
         * @property BACK_BUTTON
         * @type {string}
         * @const
         */
        this.BACK_BUTTON = 'ons-back-button';
        /**
         * @property SELECTOR_OF_CLEANER
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_CLEANER = '.input-cleaner';

        /**
         * @property URL_OF_WORD_METHODS
         * @type {string}
         * @const
         */
        this.URL_OF_WORD_METHODS = '/words';
        /**
         * @property URL_OF_LABEL_METHODS
         * @type {string}
         * @const
         */
        this.URL_OF_LABEL_METHODS = '/labels';

        /**
         * @property DIRECTORY_OF_PHOTOS
         * @type {string}
         * @const
         */
        this.DIRECTORY_OF_PHOTOS = '/photos';

        /**
         * @property AJAX_OF_GET_ALL_LABELS
         * @type {{URL: string, METHOD: string}}
         * @const
         */
        this.AJAX_OF_GET_ALL_LABELS = {
            URL: `${this.URL_OF_LABEL_METHODS}/`,
            METHOD: 'GET'
        };

        /**
         * @property COOKIE_NAME_OF_STYLE
         * @type {string}
         * @const
         */
        this.COOKIE_NAME_OF_STYLE = 'style';
        /**
         * @property COOKIE_NAME_OF_COLOUR
         * @type {string}
         * @const
         */
        this.COOKIE_NAME_OF_COLOUR = 'colour';
		/**
		 * @type {string}
         * @const
		 */
		this.WINDOW_NAME_OF_WORDS = 'words';
		/**
		 * @type {string}
         * @const
		 */
		this.WINDOW_NAME_OF_LABELS = 'labels';
		/**
		 * @type {string}
         * @const
		 */
		this.EVENT_ADD_NEW_ITEM = 'add-new-item';
		/**
		 * @type {string}
         * @const
		 */
		this.EVENT_REMOVE_AN_ITEM = 'remove-item';
		/**
		 * @type {string}
         * @const
		 */
		this.EVENT_EDIT_AN_ITEM = 'edit-item';





        this.initInputCleaners();
    }

    /**
     * @desc Event listener for Xs on inputs
     */
    initInputCleaners ()
    {
        const cleaners = this.qAll(this.SELECTOR_OF_CLEANER);
        for (const cleaner of cleaners)
        {
            cleaner.addEventListener('click', () =>
            {
                let input = cleaner.parentNode.querySelector('input');

                input.value = '';
                input.focus();
            });
        }
    }

    /**
     * @desc Make sorter the ons's pushPage()
     *
     * @param {string} where - Next page
     * @param {object} [data]
     * @param {string} [animation]
     */
    pushPage (where, data = {}, animation = '')
    {
        document.querySelector(this.SELECTOR_OF_NAVIGATOR).pushPage(where, {
            data: data,
            animation: animation
        });
    }

	/**
     *
	 /**
	 * @desc Add click eventListener for an element what will push next page
	 *
	 * @param {string} selectorOfButton
	 * @param {string} where - Next page
	 * @param {object} [data]
	 * @return {Promise<void>}
	 */
    initByClickPushPage (selectorOfButton, where, data = {})
	{
		return new Promise ((resolve) =>
		{
			this.q(selectorOfButton).addEventListener('click', () =>
			{
				document.querySelector(this.SELECTOR_OF_NAVIGATOR).pushPage(where, data);
				resolve();
			});
		});
	}


    /**
     * @desc Replace ':variable' part in url with data.variable
     *
     * @param {string} url
     * @param {object} data
     * @return {Promise<{url: string, data: object}>}
     */
    async replacePartsOfUrlWithData (url, data)
	{
		if (data && !this.isEmptyObject(data) && url)
		{
			for (let index in data)
			{
				const argumentInUrl = `:${index}`;
				if (url.search(argumentInUrl) > -1)
				{
					url = url.replace(argumentInUrl, data[index]);
					delete data[index];
				}
			}
		}

		return { url, data };
	}

    /**
     * @param {object} object
     * @return boolean
     */
    isEmptyObject (object)
    {
        return JSON.stringify(object) === JSON.stringify({});
    }

    /**
     * @desc Call correct method what depends from file and method variables
     *
     * @param {string} [method]
     * @param {string} url
     * @param {object} [data]
     * @param {boolean} [file]
     */
    ajax ({method = 'POST', url, data = {}, file = false})
	{
	    return new Promise((resolve) =>
		{
			 this.replacePartsOfUrlWithData(url, data).then(({url, data}) =>
			 {
			 	console.log(url, data);
				 if (!file)
				 {
					 if (method === 'GET' || method === 'get')
					 {
						 data = (this.isEmptyObject(data)) ? null : data;
						 this.ajaxGet(url, data).then(resolve);
					 }
					 else
					 {
						 this.ajaxPostBased(method, url, data).then(resolve);
					 }
				 }
				 else
				 {
					 if (method === 'GET' || method === 'get')
					 {
						 throw new Error('Cannot run ajax with GET method');
					 }

					 this.ajaxFileUpload(method, url, data).then(resolve);
				 }
			 });
		});
	}


    /**
     * @desc Try return json in callback, if cannot return with official variable
     *
     * @param {string} response
     * @return {Promise<json|*>}
     */
    checkJson (response)
    {
    	return new Promise((resolve) =>
		{
			try
			{
				resolve(JSON.parse(response));
			}
			catch (e)
			{
				console.error(e.message);
				resolve(response);
			}
		});
    }

    /**
     * @desc For file upload through ajax
     *
     * @param {string} method
     * @param {string} url
     * @param {file}  file
     * @return {Promise<any>}
     */
    ajaxFileUpload (method, url, file)
    {
        return new Promise(resolve =>
		{
			const formData = new FormData();
			formData.append('file', file);

			let xobj = new XMLHttpRequest();
			xobj.open(method, `/ajax${url}`, true);
			xobj.onreadystatechange = () =>
			{
				if (xobj.readyState == 4 && xobj.status == "200")
				{
					this.checkJson(xobj.responseText).then(resolve);
				}
			};
			xobj.send(formData);
		});
    }

    /**
     * @desc For GET ajax calls
     *
     * @param {string} url
     * @param {object|null} [data]
     */
    ajaxGet (url, data = null)
    {
        return new Promise((resolve) =>
		{
			let urlParams = '';
            /*if (data)
             {
             urlParams = '?';
             for (let index in data)
             {
             urlParams += `${index}=${data[index]}&`
             }

             urlParams = urlParams.slice(0, urlParams.length - 1);
             }*/

			let xobj = new XMLHttpRequest();
			xobj.open('GET', `/ajax${url}${urlParams}`, true);
			xobj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xobj.onreadystatechange = () =>
			{
				if (xobj.readyState == 4 && xobj.status == "200")
				{
					this.checkJson(xobj.responseText).then(resolve);
				}
			};
			xobj.send(null);
		});
    }

    /**
     * @desc For POST, PUT, DELETE ajax calls
     *
     * @param {string} method
     * @param {string} url
     * @param {object} data
     * @return {Promise<*>}
     */
    ajaxPostBased(method, url, data)
    {
        return new Promise((resolve) =>
		{
			let xobj = new XMLHttpRequest();
			xobj.open(method, `/ajax${url}`, true);
			xobj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xobj.onreadystatechange = () =>
			{
				if (xobj.readyState == 4 && xobj.status == "200")
				{
					this.checkJson(xobj.responseText).then(resolve);
				}
			};
			xobj.send(JSON.stringify(data));
		});
    }

    /**
     * @desc Call setDomElement() each data object and pass result of returnHtml with where variable
     *
     * @param {Element|string} where
     * @param {object} datas
     * @param {function} returnHtml
	 * @return {Promise<void>}
     */
    showEveryDatas ({where, datas, returnHtml})
    {
    	return new Promise((resolve) =>
		{
			for (let data of datas)
			{
				const html = returnHtml(data);

				this.setDomElement({
					where: where,
					html: html
				});
			}

			resolve();
		});
    }

    /**
     * @param {string} html
     * @return {Element|*}
     */
    createOnsElement (html)
    {
        return ons._util.createElement(html);
    }

    /**
     * @param {Element|string} where
     * @param {Element|string} html
     * @param {function} callback
     */
    setDomElement ({where, html, callback = new Function()})
    {
        if (typeof where === 'string')
        {
            where = this.q(where);
        }


        const typeOfHtml = typeof html;
        if (typeOfHtml === 'object')
        {
            where.appendChild(html);
        }
        else if (typeOfHtml === 'string')
        {
            where.innerHTML += html;
        }
        else
        {
            console.warn('result of returnHtml does not object or string so I cannot add it to DOM');
        }

        return callback();
    }

    /**
     * @desc Call showEveryDatas() after got data from server
     *
     * @param {string} url
     * @param {string} showWhere
     * @param {function} showableHtml
     * @param {string} [store] - Name of variable on window object, data will save here
	 * @return {Promise<void>}
     */
    downAndShow ({url, showWhere, showableHtml, store = null})
    {
    	return new Promise((resolve) =>
		{
			this.ajaxGet(url).then((response) =>
			{
				if (store)
				{
					window[store] = response;
				}

				this.showEveryDatas({
					where: showWhere,
					datas: response,
					returnHtml: showableHtml
				}).then(resolve);
			});
		});
    }

    /*/**
     * @desc Call downAndShow() after send data to server
     *
     * @param {string} upUrl
     * @param {object} upData
     * @param {string} downUrl
     * @param {string} showWhere
     * @param {function} showableHtml
     * @param {function} [after]
     *!/
    upDownAndShow ({upUrl, upData, downUrl, showWhere, showableHtml, after})
    {
        this.postAjax(upUrl, upData, (response) =>
        {
            if (response)
            {
                return this.downAndShow({
                    url: downUrl,
                    showWhere: showWhere,
                    showableHtml: showableHtml,
                    after: after
                });
            }

            return false;
        });
    }

    /**
     * @param {string} hash
     *!/
    changeHash (hash)
    {
        window.location.hash = hash;
    }*/


    /**
     * @desc Call the showLabelsInInput() after got labels from backend
     *
     * @param {string} selectorOfLabel
     */
    getLabelsForSelect (selectorOfLabel)
	{
		if (window.labels.length === 0)
		{
			return this.ajax({
				method: this.AJAX_OF_GET_ALL_LABELS.METHOD,
				url: this.AJAX_OF_GET_ALL_LABELS.URL
			}).then((result) =>
			{
				window.labels = result;

				return this.showLabelsInInput(selectorOfLabel);
			});
		}
	}

    /**
     * @desc Put labels from window.labels to select input
     *
     * @param {string} selectorOfLabel
     */
    showLabelsInInput (selectorOfLabel)
	{
		const labelInput = this.q(selectorOfLabel);

		for (const label of window.labels)
		{
			const option = document.createElement('option');
			option.value = label._id;
			option.text = label.name;

			labelInput.add(option);
		}
	}

    /**
     * @desc Make sorter the querySelector
     *
     * @param {string} selector
     * @return {Element}
     */
    q (selector)
	{
		const length = selector.split(' ').length;
		const firstCharOfSelector = selector.charAt(0);

		if (length <= 1 && firstCharOfSelector === '#')
		{
			return document.getElementById(selector.substring(1));
		}

		return this.page.querySelector(selector);
	}

    /**
     * @desc Make sorter the querySelectorAll
     *
     * @param {string} selector
     * @return {NodeList}
     */
    qAll (selector)
    {
        return this.page.querySelectorAll(selector);
    }

    /**
     * @desc If want to refresh elements from backend
     */
    pushBackWithRefresh ()
    {
        this.pushBack({refresh: true});
    }

    /**
     * @desc It push back to previous page from current, back buttons automatically from ONS
     *
     * @param {object} [options]
     * @return Promise<HTMLElement>
     */
    pushBack (options = {})
    {
        return new Promise((resolve) =>
		{
			document.querySelector(this.SELECTOR_OF_NAVIGATOR)
					.popPage(options)
					.then(resolve);
		});
    }

    /**
     * @desc Set default expires time for do not forgot
     *
     * @param {string} name
     * @param {string} value
     */
    setCookie (name, value)
    {
        Cookies.set(name, value, { expires: 1000000 });
    }

	/**
     * @desc Refresh the this.page object after pop event
     *
	 * @param {object} page
	 */
	postPushBack (page)
    {
        this.page = page;
    }
}