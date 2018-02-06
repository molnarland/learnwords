import List from './List';

export default class ListWords extends List
{
    constructor (page)
    {
        super(page);

        this.plusButton = '#plus-word';
        this.changeForm = 'change-words-form';

        this.titleOfNewForm = 'New word';
        this.titleOfEditForm = 'Edit word';

        this.selectorOfList = '#change-words-items';
        this.selectorOfChangeItem = `${this.selectorOfList} ons-list-item`;

        this.ajaxOfGetAll = {
            url: `${this.URL_OF_WORD_METHODS}/`,
            method: 'GET'
        };

        this.init();
    }

    init ()
    {
        this.initOfPushToForm();
        this.showItems();
    }

    /**
     * @desc Define html each element
     */
    showItems ()
	{
		super.showItems({
			showableHtml: (word) =>
			{
				const { _id: id, native, learnable } = word;

				return this.createOnsElement({ id, native, learnable });
			},
			store: this.WINDOW_NAME_OF_WORDS
		});
	}


	/**
	 * @param {string} id
	 * @param {string} native
	 * @param {string} learnable
	 */
	createOnsElement({ id, native, learnable })
	{
		return super.createOnsElement(
			`<ons-list-item data-id=${id} tappable modifier="longdivider">
                <div class="left">${native}</div>
                <div class="center"><ons-icon icon="arrows-h"></ons-icon></div>
                <div class="right">${learnable}</div>
			</ons-list-item>`
		);
	}

	postPushBack(page)
	{
		super.postPushBack(page, (editedItem) =>
		{
			const { id, native, learnable, labelId, photo } = editedItem;

			const editedElem = this.q(`${this.selectorOfChangeItem}[data-id="${id}"]`);
			editedElem.querySelector('.left').innerHTML = native;
			editedElem.querySelector('.right').innerHTML = learnable;
		})
	}
}