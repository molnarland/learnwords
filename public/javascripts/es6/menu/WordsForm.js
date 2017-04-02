import Form from './Form';
import ons from 'onsenui';

export default class WordsForm extends Form
{
    constructor(page)
    {
        super(page);

        /*this.datasForInputs = {
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
        };*/

        this.selectorOfNative = '#native';
        this.selectorOfLearnable = '#learnable';
        this.selectorOfUploadFile = '#upload-file';
        this.selectorOfShowedUploadInput = '#file-upload-input';
        this.selectorOfPhotoPreview = '.photo-preview';
        this.selectorOfSaveButton = '#save';
        this.selectorOfLabel = '#label-input';


        this.ajaxOfSaveOne = {
            url: `${this.urlOfWordMethods}/`,
            method: 'POST'
        };
        this.ajaxOfEditOne = {
            url: `${this.urlOfWordMethods}/`,
            method: 'PUT'
        };
        this.ajaxOfDeleteOne = {
            url: `${this.urlOfWordMethods}/`,
            method: 'DELETE'
        };


        this.ajaxOfGetAllLabels = {
            url: `${this.urlOfLabelMethods}/`,
            method: 'GET'
        };

        this.init();
    }

    init ()
    {
        super.init();

        this.setOptionsOfLabelInput();
        this.handlingOfUploadFile();
    }


    setNewItem ()
    {
        const file = this.getFile();
        let data = {
            native: this.getNative(),
            learnable: this.getLearnable(),
            label: this.getLabel()
        };

        if (file)
        {
            return this.ajax({
                url:'/files/photo',
                data: file,
                file: true,
                success: (photo) =>
                {
                    data.photo = photo;
                    super.setNewItem({data: data})
                }
            });
        }

        return super.setNewItem({data});
    }

    postAWord (photo)
    {
        this.ajax({
            method: 'post',
            url: `${this.urlOfWordMethods}/`,
            data: {
                native: this.q(this.selectorOfNative).value,
                learnable: this.q(this.selectorOfLearnable).value,
                photo: photo,
                label: this.q(this.selectorOfLabel).value
            },
            success: (response) =>
            {
                if (response)
                {
                    this.pushBackWithRefresh();
                }
            }
        })
    }

    setOptionsOfLabelInput ()
    {
        if (window.labels.length === 0)
        {
            this.ajax({
                method: this.ajaxOfGetAllLabels.method,
                url: this.ajaxOfGetAllLabels.url,
                success: (result) =>
                {
                    window.labels = result;

                    this.showLabelsInInput();
                }
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

    setValues ()
    {
        const word = this.page.data.item;

        this.q(this.selectorOfNative).value = word.native;
        this.q(this.selectorOfLearnable).value = word.learnable;
        this.showPhoto(word.photo);
        this.q(this.selectorOfLabel).value = word.labelId;
    }

    editItem ()
    {
        const file = this.getFile();
        const oldPhoto = this.page.data.item.photo;
        let data = {
            id: this.page.data.item._id,
            native: this.getNative(),
            learnable: this.getLearnable(),
            label: this.getLabel(),
        };

        if (file)
        {
            return this.ajax({
                method: 'PUT',
                url: '/files/photo/',
                file: true,
                data: file,
                success: (photo) =>
                {
                    data.photo = photo;
                    super.editItem({data: data});
                }
            });
        }

        super.editItem({data: data});
    }


    handlingOfUploadFile ()
    {
        this.q(this.selectorOfUploadFile).addEventListener('change', (event) =>
        {
            let files = event.target.files;

            if (files && files.length > 0)
            {
                const file = files[0];
                const showedUploadInput = document.querySelector(this.selectorOfShowedUploadInput);


                showedUploadInput.value = file.name;

                if (file.type.split('/')[0] !== 'image')
                {
                    this.q(this.selectorOfPhotoPreview).removeAttribute('src');
                    showedUploadInput.dataset.error = 'Images upload only';
                    this.q(this.selectorOfSaveButton).disabled = true;

                }
                else
                {
                    this.preShowPhoto(file);
                    delete showedUploadInput.dataset.error;
                    this.q(this.selectorOfSaveButton).disabled = false;
                }
            }
        });
    }

    preShowPhoto (file)
    {
        const reader = new FileReader();
        reader.onload = (e) =>
        {
            this.showPhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    showPhoto (photo)
    {
        if (photo)
        {
            photo = (photo.search('base64') > -1) ? photo : `${this.directoryOfPhotos}/${photo}`;
            this.q(this.selectorOfPhotoPreview).setAttribute('src', photo);
        }
    }



    getNative ()
    {
        return this.q(this.selectorOfNative).value;
    }

    getLearnable ()
    {
        return this.q(this.selectorOfLearnable).value
    }

    getLabel ()
    {
        return this.q(this.selectorOfLabel).value
    }

    getFile ()
    {
        return this.q(this.selectorOfUploadFile).files[0];
    }

    /*initInputs ()
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
    };*/
}