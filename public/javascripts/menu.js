/*menu*/
document.addEventListener('init', function (event)
{
    var page = event.target;

    var infoOfPages = {
        addWords: {button: '#change-words', urlHash: 'change_words', onsPage: 'change-words'}
    };
    var selectorOfNavigator = '#navigator';
    var selectorOfBackButton = '.left ons-back-button';
    var objectOfModal =  {
        animation: 'fade',
        animationOptions: {timing: 'ease-in'}
    };


    if (page.id === 'menu')
    {
        for (var index in infoOfPages)
        {
            var infoOfPage = infoOfPages[index];

            page.querySelector(infoOfPage.button).addEventListener('click', function ()
            {
                document.querySelector(selectorOfNavigator).pushPage(infoOfPage.onsPage);
                window.location.hash = infoOfPage.urlHash;
            });
        }
    }
    else if (page.id === 'change-words')
    {
        const selectorOfNativePlus = '#native-plus',
            selectorOfNativeList = '#native';

        page.querySelector('#plus-word').addEventListener('click', function ()
        {
            document.querySelector(selectorOfNavigator).pushPage('change-words-form');
        });


        page.querySelector(selectorOfNativePlus).addEventListener('click', function ()
        {
            var numberOfInput = page.querySelectorAll(selectorOfNativeList + ' ons-input').length + 1;


            page.querySelector(selectorOfNativeList).innerHTML +=
                '<ons-input modifier="underbar" placeholder="#'+numberOfInput+'" float="" id="native-'+numberOfInput+'">' +
                    '<label class="text-input__container">' +
                        '<input class="text-input text-input--underbar" placeholder="#'+numberOfInput+'">' +
                        '<span class="_helper text-input__label text-input--underbar__label">#'+numberOfInput+'</span>' +
                        '<span class="input-label"></span>' +
                    '</label>' +
                '</ons-input>';


            console.log(page.querySelector(selectorOfNativeList));
        });
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