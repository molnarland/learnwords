import ons from 'onsenui';

export default class Global
{
    constructor(page)
    {
        this.page = page;

        this.selectorOfNavigator = '#navigator';
        this.selectorOfTitle = 'ons-toolbar .center';
        this.backButton = 'ons-back-button';
        this.selectorOfCleaner = '.input-cleaner';

        this.urlOfWordMethods = '/words';
        this.urlOfLabelMethods = '/labels';

        this.directoryOfPhotos = '/photos';

        this.ajaxOfGetAllLabels = {
            url: `${this.urlOfLabelMethods}/`,
            method: 'GET'
        };

        this.cookieNameOfStyle = 'style';
        this.cookieNameOfColour = 'colour';

        this.initInputCleaners();
    }

    /**
     * @desc Event listener for Xs on inputs
     */
    initInputCleaners ()
    {
        const cleaners = this.qAll(this.selectorOfCleaner);
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
        document.querySelector(this.selectorOfNavigator).pushPage(where, {
            data: data,
            animation: animation
        });
    }

    /**
     * @desc Add click eventListener for an element what will push next page
     *
     * @param {string} selectorOfButton
     * @param {string} where - Next page
     * @param {object} [data]
     * @param {object} [callback]
     */
    initByClickPushPage (selectorOfButton, where, data = {}, callback = new Function())
    {
        this.q(selectorOfButton).addEventListener('click', () =>
        {
            document.querySelector(this.selectorOfNavigator).pushPage(where, data);
            callback();
        });
    }

    /**
     * @desc Replace ':variable' part in url with data.variable
     *
     * @param {string} url
     * @param {object} data
     * @param {function} callback
     */
    replacePartsOfUrlWithData (url, data, callback)
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

        callback(url, data);
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
     * @param {function} success
     * @param {boolean} [file]
     */
    ajax ({method = 'POST', url, data = {}, success, file = false})
    {
        this.replacePartsOfUrlWithData(url, data, (url, data) =>
        {
            if (!file)
            {
                if (method === 'GET' || method === 'get')
                {
                    data = (this.isEmptyObject(data)) ? null : data;
                    this.ajaxGet(url, success, data);
                }
                else
                {
                    this.ajaxPostBased(method, url, data, success);
                }
            }
            else
            {
                if (method === 'GET' || method === 'get')
                {
                    throw new Error('Cannot run ajax with GET method');
                }

                this.ajaxFileUpload(method, url, data, success);
            }
        });
    }


    /**
     * @desc Try return json in callback, if cannot return with official variable
     *
     * @param {string} response
     * @param {function} callback
     * @return {json|*}
     */
    checkJson (response, callback)
    {
        try
        {
            callback(JSON.parse(response));
        }
        catch (e)
        {
            console.error(e.message);
            callback(response);
        }
    }

    /**
     * @desc For file upload through ajax
     *
     * @param {string} method
     * @param {string} url
     * @param {file}  file
     * @param {function} success
     */
    ajaxFileUpload (method, url, file, success)
    {
        const formData = new FormData();
        formData.append('file', file);

        let xobj = new XMLHttpRequest();
        xobj.open(method, `/ajax${url}`, true);
        xobj.onreadystatechange = () =>
        {
            if (xobj.readyState == 4 && xobj.status == "200")
            {
                return this.checkJson(xobj.responseText, success)
            }
        };
        xobj.send(formData);
    }

    /**
     * @desc For GET ajax calls
     *
     * @param {string} url
     * @param {function(object)} callback
     * @param {object|null} [data]
     */
    ajaxGet (url, callback, data = null)
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
                return this.checkJson(xobj.responseText, callback)
            }
        };
        xobj.send(null);
    }

    /**
     * @desc For POST, PUT, DELETE ajax calls
     *
     * @param {string} method
     * @param {string} url
     * @param {object} data
     * @param{function(object)}  callback
     */
    ajaxPostBased(method, url, data, callback)
    {
        let xobj = new XMLHttpRequest();
        xobj.open(method, `/ajax${url}`, true);
        xobj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xobj.onreadystatechange = () =>
        {
            if (xobj.readyState == 4 && xobj.status == "200")
            {
                return this.checkJson(xobj.responseText, callback)
            }
        };
        xobj.send(JSON.stringify(data));
    }

    /**
     * @desc Call setDomElement() each data object and pass result of returnHtml with where variable
     *
     * @param {Element|string} where
     * @param {object} datas
     * @param {function} returnHtml
     * @param {function} [after]
     */
    showEveryDatas ({where, datas, returnHtml, after = new Function()})
    {
        for (let data of datas)
        {
            const html = returnHtml(data);

            this.setDomElement({
                where: where,
                html: html
            });
        }

        return after();
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
     * @param {function} [after]
     */
    downAndShow ({url, showWhere, showableHtml, store = null, after})
    {
        this.ajaxGet(url, (response) =>
        {
            if (store)
            {
                window[store] = response;
            }

            return this.showEveryDatas({
                where: showWhere,
                datas: response,
                returnHtml: showableHtml,
                after: after
            });
        });
    }

    /**
     * @desc Call downAndShow() after send data to server
     *
     * @param {string} upUrl
     * @param {object} upData
     * @param {string} downUrl
     * @param {string} showWhere
     * @param {function} showableHtml
     * @param {function} [after]
     */
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
     */
    changeHash (hash)
    {
        window.location.hash = hash;
    }


    /**
     * @desc Call the showLabelsInInput() after got labels from backend
     *
     * @param {string} selectorOfLabel
     * @param {function} [callback]
     */
    getLabelsForSelect (selectorOfLabel, callback = new Function())
    {
        if (window.labels.length === 0)
        {
            this.ajax({
                method: this.ajaxOfGetAllLabels.method,
                url: this.ajaxOfGetAllLabels.url,
                success: (result) =>
                {
                    window.labels = result;

                    return this.showLabelsInInput(selectorOfLabel, callback);
                }
            });
        }

        return this.showLabelsInInput(selectorOfLabel, callback);
    }

    /**
     * @desc Put labels from window.labels to select input
     *
     * @param {string} selectorOfLabel
     * @param {function} [callback]
     */
    showLabelsInInput (selectorOfLabel, callback = new Function())
    {
        const labelInput = this.q(selectorOfLabel);

        for (const label of window.labels)
        {
            const option = document.createElement('option');
            option.value = label._id;
            option.text = label.name;

            labelInput.add(option);
        }

        return callback();
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
     */
    pushBack (options = {})
    {
        document.querySelector(this.selectorOfNavigator).popPage(options);
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
}