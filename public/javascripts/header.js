var navigator = window.navigator;
var detector = {
    /**
     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
     *
     * @type boolean
     */
    isWindowsPhone: navigator.userAgent.indexOf("Windows Phone") >= 0,

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    isAndroid: navigator.userAgent.indexOf('Android') > 0 && !this.isWindowsPhone,


    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    isIOS: /iP(ad|hone|od)/.test(navigator.userAgent) && !this.isWindowsPhone,


    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    isIOS4: this.isIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent),


    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    isIOSWithBadTarget: this.isIOS && (/OS [6-7]_\d/).test(navigator.userAgent)
};

/**
 * @requires Cookies
 */
(function ()
{
    checkDeviceForUnique().then(function ()
    {
        setCurrentStyleAndColour();
        checkDeviceForStyle();
    });
}());


function checkDeviceForUnique ()
{
    if (!detector.isAndroid && !detector.isIOS)
    {
        var xobj = new XMLHttpRequest();
        xobj.open('GET', `/ajax/1`, true);
        xobj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xobj.onreadystatechange = () =>
        {
            if (xobj.readyState == 4 && xobj.status == "200")
            {
                window.location.reload(true);
            }
        };
        xobj.send(null);
    }
    else
    {
        return new Promise(function (resolve, reject)
        {
           resolve();
        });
    }
}


function checkDeviceForStyle ()
{
    var html = document.querySelector('html');
    if (detector.isAndroid)
    {
        html.className = 'android'
    }
    else
    {
        html.className = 'ios';
    }
}

function setCurrentStyleAndColour ()
{
    setCurrentCookie('style', 'light');
    setCurrentCookie('colour', 'blue');
}

/**
 * @param {string} cookieName
 * @param {string} defaultValue
 * @param {string} [dataset]
 */
function setCurrentCookie (cookieName, defaultValue, dataset = cookieName)
{
    var html = document.querySelector('html');

    var cookie = Cookies.get(cookieName);
    if (cookie)
    {
        html.dataset[dataset] = cookie;
    }
    else
    {
        Cookies.set(cookieName, defaultValue, { expires: 100000 });
        html.dataset[dataset] = defaultValue;
    }
}