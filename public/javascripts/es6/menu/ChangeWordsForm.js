import Global from './Global';
import ons from 'onsenui';

export default class ChangeWordsForm extends Global
{
    constructor(page)
    {
        super();

        this.page = page;

        this.datasForInputs = {
            native: {
                selectorOfPlus: '#native-plus',
                selectorOfList: '#native',
                whichLanguage: 'native'
            },
            learnable: {
                selectorOfPlus: '#learnable-plus',
                selectorOfList: '#learnable',
                whichLanguage: 'learnable'
            }
        };

        this.q(this.selectorOfTitle).innerHTML = this.page.data.title;

        this.initInputs();

        this.q('#upload-file').addEventListener('change', (event) =>
        {
            let elem = event.target,
                files = elem.files;
            if (files && files.length > 0)
            {
                document.querySelector('#file-upload-input').value = files[0].name;
            }
        });

        this.q('#save').addEventListener('click', () =>
        {
            let nativeInputs = this.qAll(selectorOfNativeList + ' input'),
                numberOfNativeInputs = nativeInputs.length;

            for (let index = 0; index < numberOfNativeInputs; index++)
            {
                console.log(nativeInputs[index].value, index);
            }
        });

    }


    initInputs ()
    {
        const native = this.datasForInputs.native;
        const learnable = this.datasForInputs.learnable;

        this.addPlusEvent(native.selectorOfPlus, native.selectorOfList, native.whichLanguage);
        this.addPlusEvent(learnable.selectorOfPlus, learnable.selectorOfList, learnable.whichLanguage);
    }


    addPlusEvent (selectorOfPlus, selectorOfList, whichLanguage)
    {
        this.q(selectorOfPlus).parentNode.addEventListener(
            'click',
            () => this.plus(selectorOfPlus, selectorOfList, whichLanguage),
            false
        );
    };

    plus (selectorOfPlus, selectorOfList, whichLanguage)
    {
        const numberOfInput = this.qAll(selectorOfList + ' ons-input').length + 1;

        /*this.q(selectorOfList).innerHTML +=
            '<div class="input-wrapper">' +
                '<ons-input modifier="underbar" placeholder="#'+numberOfInput+'" float="" id="'+whichLanguage+'-'+numberOfInput+'">' +
                '<label class="text-input__container">' +
                    '<input class="text-input text-input--underbar" placeholder="#'+numberOfInput+'">' +
                    '<span class="_helper text-input__label text-input--underbar__label text-input--material__label--active">#'+numberOfInput+'' +'</span>' +
                    '<span class="input-label"></span>' +
                '</label>' +
                '</ons-input>' +
                '<ons-icon icon="ion-minus-round" class="ons-icon ion-minus-round ons-icon--ion"></ons-icon>' +
            '</div>';*/

        let inputWrapper = document.createElement('div');
        inputWrapper.className = 'input-wrapper';

        inputWrapper.appendChild(ons._util.createElement(
            `<ons-input 
                modifier="underbar" 
                placeholder="#${numberOfInput}" 
                float 
                id="${whichLanguage}-${numberOfInput}">
            </ons-input>'`
        ));
        inputWrapper.appendChild(ons._util.createElement(
            `<ons-icon icon="ion-minus-round"></ons-icon>`
        ));

        this.q(selectorOfList).appendChild(inputWrapper);

        // this.addPlusEvent(selectorOfPlus, selectorOfList, whichLanguage);

        this.addMinusEvent();
    };

    addMinusEvent ()
    {
        let minusIcons = this.qAll('.input-wrapper ons-icon');
        const numberOfMinusIcons = minusIcons.length;

        for (let index = 0; index < numberOfMinusIcons; index++)
        {
            minusIcons[index].addEventListener('click', this.minus);
        }
    };

    minus (event)
    {
        let deletable = event.target.parentNode;
        deletable.parentNode.removeChild(deletable);
    };
}