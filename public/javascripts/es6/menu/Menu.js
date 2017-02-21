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
            this.page.querySelector(infoOfPage.button).addEventListener('click', () =>
            {
                document.querySelector(this.selectorOfNavigator).pushPage(infoOfPage.onsPage);
                window.location.hash = infoOfPage.urlHash;
            });
        }
    }
}