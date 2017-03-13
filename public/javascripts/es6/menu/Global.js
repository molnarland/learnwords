import ons from 'onsenui';

export default class Global
{
    constructor(page)
    {
        this.page = page;

        this.selectorOfNavigator = '#navigator';
        this.selectorOfTitle = 'ons-toolbar .center';
        this.backButton = 'ons-back-button';
    }

    /**
     * @param {string} where
     * @param {object} data
     * @param {string} animation
     */
    pushPage (where, data = {}, animation = '')
    {
        document.querySelector(this.selectorOfNavigator).pushPage(where, {
            data: data,
            animation: animation
        });
    }

    /**
     * @param {string} selectorOfButton
     * @param {string} where
     * @param {object} [data]
     * @param {object} [callback]
     */
    initByClickPushPage (selectorOfButton, where, data = {}, callback = new Function())
    {
        this.page.querySelector(selectorOfButton).addEventListener('click', () =>
        {
            document.querySelector(this.selectorOfNavigator).pushPage(where, data);
            callback();
        });
    }

    /**
     * @param {string} url
     * @param {function(object)} callback
     */
    getAjax (url, callback)
    {
        let xobj = new XMLHttpRequest();
        xobj.open('GET', `/ajax${url}`, true);
        xobj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xobj.onreadystatechange = () =>
        {
            if (xobj.readyState == 4 && xobj.status == "200")
            {
                callback(JSON.parse(xobj.responseText));
            }
        };
        xobj.send(null);
    }

    /**
     * @param {string} url
     * @param {object} data
     * @param{function(object)}  callback
     */
    postAjax(url, data, callback)
    {
        let xobj = new XMLHttpRequest();
        xobj.open('POST', `/ajax${url}`, true);
        xobj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xobj.onreadystatechange = () =>
        {
            if (xobj.readyState == 4 && xobj.status == "200")
            {
                callback(JSON.parse(xobj.responseText));
            }
        };
        xobj.send(JSON.stringify(data));
    }

    /**
     * @param {string} where
     * @param {object} datas
     * @param {function} returnHtml
     * @param {function} [after]
     */
    showEveryDatas ({where, datas, returnHtml, after = new Function()})
    {
        let aimDom = this.page.querySelector(where);

        aimDom.innerHTML = '';
        for (let data of datas)
        {
            const html = returnHtml(data);

            this.setDomElement({
                where: aimDom,
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
     * @param {string} url
     * @param {string} showWhere
     * @param {function} showableHtml
     * @param {string} store - name of variable on window object, data save here
     * @param {function} [after]
     */
    downAndShow ({url, showWhere, showableHtml, store, after})
    {
        this.getAjax(url, (response) =>
        {
            window[store] = response;

            return this.showEveryDatas({
                where: showWhere,
                datas: response,
                returnHtml: showableHtml,
                after: after
            });
        });
    }

    /**
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

    labelListItem (name)
    {

    }

    /**
     * @param {string} hash
     */
    changeHash (hash)
    {
        window.location.hash = hash;
    }

    /**
     * @param {string} selector
     * @return {Element}
     */
    q (selector)
    {
        return this.page.querySelector(selector);
    }

    /**
     * @param {string} selector
     * @return {NodeList}
     */
    qAll (selector)
    {
        return this.page.querySelectorAll(selector);
    }
}