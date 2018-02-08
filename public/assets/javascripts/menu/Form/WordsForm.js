import Form from './Form';

export default class WordsForm extends Form
{
    constructor(page)
    {
        super(page);

        /**
         * @property SELECTOR_OF_NATIVE
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_NATIVE = '#native';
        /**
         * @property SELECTOR_OF_LEARNABLE
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_LEARNABLE = '#learnable';
        /**
         * @property SELECTOR_OF_UPLOAD_FILE
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_UPLOAD_FILE = '#upload-file'
        /**
         * @property SELECTOR_OF_SHOWED_UPLOAD_INPUT
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_SHOWED_UPLOAD_INPUT = '#file-upload-input';
        /**
         * @property SELECTOR_OF_PHOTO_PREVIEW
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_PHOTO_PREVIEW = '.photo-preview';
        /**
         * @property SELECTOR_OF_SAVE_BUTTON
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_SAVE_BUTTON = '#save';
        /**
         * @property SELECTOR_OF_LABEL
         * @type {string}
         * @const
         */
        this.SELECTOR_OF_LABEL = '#label-input';


        this.ajaxOfSaveOne = {
            url: `${this.URL_OF_WORD_METHODS}/`,
            method: 'POST'
        };
        this.ajaxOfEditOne = {
            url: `${this.URL_OF_WORD_METHODS}/`,
            method: 'PUT'
        };
        this.ajaxOfDeleteOne = {
            url: `${this.URL_OF_WORD_METHODS}/`,
            method: 'DELETE'
        };

        this.ajaxOfSavePhoto = {
            url: `/files/photo/`,
            method: 'POST'
        };
        this.ajaxOfEditPhoto = {
            url: `/files/photo/`,
            method: 'PUT'
        };
        this.store = this.WINDOW_NAME_OF_WORDS;

        this.init();
    }

    init ()
    {
        super.init();

        this.getLabelsForSelect();
        this.handlingOfUploadFile();
    }

    /**
     * @desc Call super function and pass default selectors
	 * @return {Promise<boolean>}
     */
    async validate ()
    {
        return super.validate([this.SELECTOR_OF_NATIVE, this.SELECTOR_OF_LEARNABLE]);
    }

    setNewItem ()
	{
		this.validate().then(() =>
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
					method: this.ajaxOfSavePhoto.method,
					url: this.ajaxOfSavePhoto.url,
					data: file,
					file: true
				}).then((photo) =>
				{
					data.photo = photo;
					return super.setNewItem(data);
				});
			}

			return super.setNewItem(data);
		});
	}


    showLabelsInInput ()
    {
        super.showLabelsInInput(this.SELECTOR_OF_LABEL);
    }

    setValues ()
    {
        const word = this.page.data.item;

        this.q(this.SELECTOR_OF_NATIVE).value = word.native;
        this.q(this.SELECTOR_OF_LEARNABLE).value = word.learnable;
        this.showPhoto(word.photo);
        this.q(this.SELECTOR_OF_LABEL).value = word.labelId;
    }

    editItem ()
    {
        this.validate().then(() =>
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
					method: this.ajaxOfEditPhoto.method,
					url: this.ajaxOfEditPhoto.url,
					file: true,
					data: file
				}).then((photo) =>
				{
					data.photo = photo;
					return super.editItem(data);
				});
			}

            super.editItem(data);
        });
    }


    /**
     * @desc Change event listener of file upload input
     */
    handlingOfUploadFile ()
    {
        this.q(this.SELECTOR_OF_UPLOAD_FILE).addEventListener('change', (event) =>
        {
            let files = event.target.files;

            if (files && files.length > 0)
            {
                const file = files[0];
                const showedUploadInput = document.querySelector(this.SELECTOR_OF_SHOWED_UPLOAD_INPUT);


                showedUploadInput.value = file.name;

                if (file.type.split('/')[0] !== 'image')
                {
                    this.q(this.SELECTOR_OF_PHOTO_PREVIEW).removeAttribute('src');
                    showedUploadInput.dataset.error = 'Images upload only';
                    this.q(this.SELECTOR_OF_SAVE_BUTTON).disabled = true;
                }
                else
                {
                    this.preShowPhoto(file);
                    delete showedUploadInput.dataset.error;
                    this.q(this.SELECTOR_OF_SAVE_BUTTON).disabled = false;
                }
            }
        });
    }

    /**
     * @desc Programmatically basic if show photo, it call this.showPhoto()
     * @param {File} file
     */
    preShowPhoto (file)
    {
        const reader = new FileReader();
        reader.onload = (e) =>
        {
            this.showPhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    /**
     * @desc Actually show the photo
     * @param {string} photo - Name of photo or a whole photo hashed by base64
     */
    showPhoto (photo)
    {
        if (photo)
        {
            photo = (photo.search('base64') > -1) ? photo : `${this.DIRECTORY_OF_PHOTOS}/${photo}`;
            this.q(this.SELECTOR_OF_PHOTO_PREVIEW).setAttribute('src', photo);
        }
    }



    getNative ()
    {
        return this.q(this.SELECTOR_OF_NATIVE).value;
    }

    getLearnable ()
    {
        return this.q(this.SELECTOR_OF_LEARNABLE).value
    }

    getLabel ()
    {
        return this.q(this.SELECTOR_OF_LABEL).value
    }

    getFile ()
    {
        return this.q(this.SELECTOR_OF_UPLOAD_FILE).files[0];
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