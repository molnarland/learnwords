import Global from './Global';
import ons from 'onsenui';

export default class ChangeWordsForm extends Global
{
    constructor(page)
    {
        super(page);

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
        this.selectorOfUploadFile = '#upload-file';
        this.selectorOfSaveButton = '#save';
        this.selectorOfLabel = '#label-input';

        this.ajaxOfGetAllLabels = {
            url: `${this.urlOfLabelMethods}/`,
            method: 'GET'
        };

        this.q(this.selectorOfTitle).innerHTML = this.page.data.title;

        this.setOptionsOfLabelInput();
        this.handlingOfUploadFile();
        this.handlingOfSaveButton();
        //this.initInputs();
    }


    handlingOfUploadFile ()
    {
        this.q(this.selectorOfUploadFile).addEventListener('change', (event) =>
        {
            let elem = event.target,
                files = elem.files;
            if (files && files.length > 0)
            {
                document.querySelector('#file-upload-input').value = files[0].name;
            }
        });
    }

    handlingOfSaveButton ()
    {
        this.q(this.selectorOfSaveButton).addEventListener('click', () =>
        {
            let nativeInputs = this.qAll(selectorOfNativeList + ' input'),
                numberOfNativeInputs = nativeInputs.length;

            for (let index = 0; index < numberOfNativeInputs; index++)
            {
                console.log(nativeInputs[index].value, index);
            }
        });
    }

    setOptionsOfLabelInput ()
    {
        if (window.labels.length === 0)
        {
            this.ajax(this.ajaxOfGetAllLabels.method, this.ajaxOfGetAllLabels.url, {}, (result) =>
            {
                window.labels = result;

                this.showLabelsInInput();
            });
        }

        return this.showLabelsInInput();
    }

    showLabelsInInput ()
    {
        const labelInput = this.q(this.selectorOfLabel);

        for (const label of window.labels)
        {
            const option = document.createElement('option');
            option.value = label._id;
            option.text = label.name;

            labelInput.add(option);
        }
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
            () => this.plus(selectorOfList, whichLanguage),
            false
        );
    };

    plus (selectorOfList, whichLanguage)
    {
        const numberOfInput = this.qAll(selectorOfList + ' ons-input').length + 1;


        let inputWrapper = document.createElement('div');
        inputWrapper.className = 'input-wrapper';

        inputWrapper.appendChild(this.createOnsElement(
            `<ons-input 
                modifier="underbar" 
                placeholder="#${numberOfInput}" 
                float 
                id="${whichLanguage}-${numberOfInput}">
            </ons-input>`
        ));
        inputWrapper.appendChild(this.createOnsElement(
            `<ons-icon icon="ion-minus-round"></ons-icon>`
        ));

        this.q(selectorOfList).appendChild(inputWrapper);

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