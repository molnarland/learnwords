import Global from './Global';

export default class Menu extends Global
{
    constructor (page)
    {
        super(page);

        this.infoOfMainPages = {
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

    goToPageByButtonClick ()
    {
        for (let index in this.infoOfMainPages)
        {
            const infoOfPage = this.infoOfMainPages[index];
            this.initByClickPushPage(infoOfPage.button, infoOfPage.onsPage, null, () =>
            {
                window.location.hash = infoOfPage.urlHash;
            });
        }
    }

    goToPageByHash ()
    {
        let infoOfCurrentPage = null;
        for (let index in this.infoOfMainPages)
        {
            const info = this.infoOfMainPages[index];
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