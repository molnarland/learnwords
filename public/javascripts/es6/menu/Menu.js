export default class Menu
{
    constructor (page)
    {
        this.infoOfMainPages = {
            addWords: {button: '#change-words', urlHash: 'change_words', onsPage: 'change-words'},
            addLabels: {button: '#change-labels', urlHash: 'change_labels', onsPage: 'change-labels'}
        };

        for (let infoOfPage of this.infoOfMainPages)
        {
            page.querySelector(infoOfPage.button).addEventListener('click', function ()
            {
                document.querySelector(selectorOfNavigator).pushPage(infoOfPage.onsPage);
                window.location.hash = infoOfPage.urlHash;
            });
        }
    }
}