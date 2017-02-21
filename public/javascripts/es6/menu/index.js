import Menu from './Menu.js';

document.addEventListener('init', function (event)
{
    const page = event.target;


    const selectorOfNavigator = '#navigator';
    const selectorOfBackButton = '.left ons-back-button';
    const objectOfModal =  {
        animation: 'fade',
        animationOptions: {timing: 'ease-in'}
    };


    if (page.id === 'menu')
    {
        new Menu(page);
    }
    else if (page.id === 'change-words')
    {
        page.querySelector('#plus-word').addEventListener('click', function ()
        {
            document.querySelector(selectorOfNavigator).pushPage('change-words-form', {data: {title: 'New word'}});
        });

    }
    else if (page.id === 'change-words-form')
    {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;

        plusAndMinusOfWordInputs('#native-plus', '#native', 'native');
        plusAndMinusOfWordInputs('#learnable-plus', '#learnable', 'learnable');

        page.querySelector('#upload-file').addEventListener('change', function (event)
        {
            var elem = event.target,
                files = elem.files;
            if (files && files.length > 0)
            {
                document.querySelector('#file-upload-input').value = files[0].name;
            }
        });

        page.querySelector('#save').addEventListener('click', function ()
        {
            var nativeInputs = page.querySelectorAll(selectorOfNativeList + ' input'),
                numberOfNativeInputs = nativeInputs.length;

            for (var index = 0; index < numberOfNativeInputs; index++)
            {
                console.log(nativeInputs[index].value, index);
            }
        });

        function plusAndMinusOfWordInputs(selectorOfPlus, selectorOfList, whichLanguage)
        {
            this.addPlusEvent = function ()
            {
                //TODO it is not working correctly in first calling (native)
                page.querySelector(selectorOfPlus).parentNode.addEventListener('click', this.plus.bind(this), false);
            };

            this.plus = function ()
            {
                var numberOfInput = page.querySelectorAll(selectorOfList + ' ons-input').length + 1;

                page.querySelector(selectorOfList).innerHTML +=
                    '<div class="input-wrapper">' +
                    '<ons-input modifier="underbar" placeholder="#'+numberOfInput+'" float="" id="'+whichLanguage+'-'+numberOfInput+'">' +
                    '<label class="text-input__container">' +
                    '<input class="text-input text-input--underbar" placeholder="#'+numberOfInput+'">' +
                    '<span class="_helper text-input__label text-input--underbar__label text-input--material__label--active">#'+numberOfInput+'' +'</span>' +
                    '<span class="input-label"></span>' +
                    '</label>' +
                    '</ons-input>' +
                    '<ons-icon icon="ion-minus-round" class="ons-icon ion-minus-round ons-icon--ion"></ons-icon>' +
                    '</div>';

                this.addPlusEvent();

                this.addMinusEvent();
            };

            this.addMinusEvent = function ()
            {
                var minusIcons = page.querySelectorAll('.input-wrapper ons-icon'),
                    numberOfMinusIcons = minusIcons.length;

                for (var index = 0; index < numberOfMinusIcons; index++)
                {
                    minusIcons[index].addEventListener('click', this.minus);
                }
            };

            this.minus = function (event)
            {
                var deletable = event.target.parentNode;
                deletable.parentNode.removeChild(deletable);
            };


            this.addPlusEvent();
        }
    }
    else if (page.id === 'change-labels')
    {

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