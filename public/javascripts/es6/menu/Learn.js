import Game from './Game';

export default class Learn extends Game
{
    constructor (page)
    {
        super(page);

        this.ajaxOfGetWordsForLearn = {
            url: `${this.urlOfGameMethods}/{label}/{sort}/{first}`,
            method: 'GET'
        };

        //from previous page
        const data = this.page.data.data;
        this.label = data.label;
        this.sort = data.sort;
        this.showBoth = data.showBoth;
        this.showFirst = data.showFirst;


        this.getWords();
    }

    getWords ()
    {
        this.ajax({
            method: this.ajaxOfGetWordsForLearn.method,
            url: `${this.ajaxOfGetWordsForLearn.url}/`,
            data: {
                label: this.label,
                sort: this.sort,
                first: this.showFirst
            },
            success: (response) =>
            {
                if (response && response.length > 0)
                {
                    //learn is start
                }
                else
                {
                    //not found -> back btn
                }
            }
        })
    }
}