import Global from './Global';

export default class Menu extends Global
{
    constructor (page)
    {
        super();
        this.page = page;

        this.infoOfMainPages = {
            addWords: {button: '#change-words', urlHash: 'change_words', onsPage: 'change-words'},
            addLabels: {button: '#change-labels', urlHash: 'change_labels', onsPage: 'change-labels'}
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

        // const infoOfCurrentPage = this.infoOfMainPages.find(info => info.urlHash === window.location.hash.substring(1));

        if (infoOfCurrentPage)
        {
            this.page.querySelector(infoOfCurrentPage.button).click();
        }
    }
}