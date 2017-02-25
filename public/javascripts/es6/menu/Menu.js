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


        for (let index in this.infoOfMainPages)
        {
            const infoOfPage = this.infoOfMainPages[index];
            this.initByClickPushPage(infoOfPage.button, infoOfPage.onsPage, null, () =>
            {
                window.location.hash = infoOfPage.urlHash;
            });
        }
    }
}