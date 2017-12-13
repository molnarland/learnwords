class Detector
{

	constructor ()
	{
		this.navigator = window.navigator
	}

	/**
	 * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	 *
	 * @return boolean
	 */
	isWindowsPhone ()
	{
		return this.navigator.userAgent.indexOf("Windows Phone") >= 0;
	}

	/**
	 * Android requires exceptions.
	 *
	 * @return boolean
	 */
	isAndroid ()
	{
		return this.navigator.userAgent.indexOf('Android') > 0 && !this.isWindowsPhone();
	}

	/**
	 * iOS requires exceptions.
	 *
	 * @return boolean
	 */
	isIOS ()
	{
		return /iP(ad|hone|od)/.test(navigator.userAgent) && !this.isWindowsPhone();
	}


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @return boolean
	 */
	isIOS4 ()
	{
		return this.isIOS() && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	}

	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @return boolean
	 */
	isIOSWithBadTarget ()
	{
		this.isIOS() && (/OS [6-7]_\d/).test(navigator.userAgent);
	}
}

const detector = new Detector();

setCurrentStyleAndColour();
checkDeviceForStyle();


function checkDeviceForStyle ()
{
    let html = document.querySelector('html');
    if (detector.isAndroid())
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
    let html = document.querySelector('html');

    let cookie = Cookies.get(cookieName);
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