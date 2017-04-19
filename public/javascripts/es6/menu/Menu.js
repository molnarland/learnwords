import Global from './Global';

export default class Menu extends Global
{
    constructor (page)
    {
        super(page);

        /**
         * @property INFO_OF_MAIN_PAGES
         * @type {{
         *          addWords: {button: string, urlHash: string, onsPage: string},
         *          addLabels: {button: string, urlHash: string, onsPage: string},
         *          learn: {button: string, urlHash: string, onsPage: string},
         *          settings: {button: string, urlHash: string, onsPage: string}
         * }}
         */
        this.INFO_OF_MAIN_PAGES = {
            addWords: {
                button: '#change-words',
                urlHash: 'change_words',
                onsPage: 'change-words'
            },
            addLabels: {
                button: '#change-labels',
                urlHash: 'change_labels',
                onsPage: 'change-labels'
            },
            learn: {
                button: '#settings-learn',
                urlHash: 'learn',
                onsPage: 'settings-learn'
            },
            settings: {
                button: '#settings',
                urlHash: 'settings',
                onsPage: 'settings'
            }
        };

        this.goToPageByButtonClick();
        this.goToPageByHash();
        /*if ("onhashchange" in window)
        {
            window.addEventListener("hashchange", () => this.goToPageByHash(), false);
        }*/
    }

    /**
     * @desc Add click event listener for each button what will push to correct page
     */
    goToPageByButtonClick ()
    {
        for (let index in this.INFO_OF_MAIN_PAGES)
        {
            const infoOfPage = this.INFO_OF_MAIN_PAGES[index];
            this.initByClickPushPage(infoOfPage.button, infoOfPage.onsPage, null, () =>
            {
                window.location.hash = infoOfPage.urlHash;
            });
        }
    }

    /**
     * @desc At loading check hash in url and pass to there
     */
    goToPageByHash ()
    {
        let infoOfCurrentPage = null;
        for (let index in this.INFO_OF_MAIN_PAGES)
        {
            const info = this.INFO_OF_MAIN_PAGES[index];
            if (info.urlHash === window.location.hash.substring(1))
            {
                infoOfCurrentPage = info;
                break;
            }
        }


        if (infoOfCurrentPage)
        {
            this.q(infoOfCurrentPage.button).click();
        }
    }
}