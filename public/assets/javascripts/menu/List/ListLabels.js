import List from './List';

export default class ListLabels extends List
{
    constructor(page)
    {
        super(page);

        this.plusButton = '#plus-label';
        this.changeForm = 'change-label-form';

        this.titleOfNewForm = 'New label';
        this.titleOfEditForm = 'Edit label';

        this.selectorOfList = '#change-labels-items';
        this.selectorOfChangeItem = `${this.selectorOfList} ons-list-item`;

        this.ajaxOfGetAll = {
            url: `${this.URL_OF_LABEL_METHODS}/`,
            method: 'GET'
        };

        this.init();
    }

    init ()
    {
        this.showItems();
        this.initOfPushToForm();
    }

    /**
     * @desc Define html each element
     */
    showItems ()
	{
		super.showItems({
			showableHtml: (label) =>
			{
				const { _id: id, name } = label;

				return this.createOnsElement({ id, name });
			},
			store: 'labels'
		});
	}

	/**
	 * @param {string} id
	 * @param {string} name Obviously new name of label
	 */
	createOnsElement ({ id, name })
	{
		console.log(id, name);
		return super.createOnsElement(
			`<ons-list-item data-id="${id}" tappable modifier="longdivider">` +
				`<div class="center">${name}</div>` +
				`<div class="right"><ons-icon icon="ion-edit"></ons-icon></div>` +
			`</ons-list-item>`
		);
	}

    postPushBack(page)
	{
		super.postPushBack(page, (editedItem) =>
		{
			const { id, name, userId } = editedItem;

			const editedElem = this.q(`${this.selectorOfChangeItem}[data-id="${id}"`);
			editedElem.querySelector('.center').innerHTML = name;
		});
	}
}
