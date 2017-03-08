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
     */
    pushPage (where, data = {})
    {
        document.querySelector(this.selectorOfNavigator).pushPage(where, {
            data: data,
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
        let html = '';

        for (let data of datas)
        {
            html += returnHtml(data);
        }

        this.page.querySelector(where).innerHTML = html;
        return after();
    }

    /**
     * @param {string} url
     * @param {string} showWhere
     * @param {function} showableHtml
     * @param {function} [after]
     */
    downAndShow ({url, showWhere, showableHtml, after})
    {
        this.getAjax(url, (response) =>
        {
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
}