export default class Global
{
    constructor()
    {
        this.selectorOfNavigator = '#navigator';
        this.selectorOfTitle = 'ons-toolbar .center';
    }

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
}