import ons from 'onsenui';

import Menu from './Menu';
import ChangeWords from './ChangeWords';
import ChangeWordsForm from './ChangeWordsForm';
import ChangeLabels from './ChangeLabels';


document.addEventListener('init', function (event)
{
    const page = event.target;


    const selectorOfBackButton = '.left ons-back-button';
    const objectOfModal =  {
        animation: 'fade',
        animationOptions: {timing: 'ease-in'}
    };

    switch (page.id)
    {
        case 'menu':
            new Menu(page);
            break;
        case 'change-words':
            new ChangeWords(page);
            break;
        case 'change-words-form':
            new ChangeWordsForm(page);
            break;
        case 'change-labels':
            new ChangeLabels(page);
            break;
        default:
            break;
    }
});

function getAjax(url, callback)
{
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function ()
    {
        if (xobj.readyState == 4 && xobj.status == "200")
        {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);

}

function postAjax()
{

}


(function () {
    getAjax('/ajax/all-words', function (response)
    {
        var changeWordsItems = document.getElementById('change-words-items');
        for (var index in response)
        {
            changeWordsItems.innerHTML += response[index];
        }
    });
}());