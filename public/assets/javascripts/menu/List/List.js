import Global from './../Global';

export default class List extends Global
{
	constructor (page)
	{
		super(page);

		/**
		 * @property plusButton
		 * @desc Push to newItem page when click it
		 * @type {String}
		 * @protected
		 */
		this.plusButton = String;
		/**
		 * @property changeForm
		 * @desc newItem or editItem page,
		 *       next page can be: onsen/partials/change-labels-form.pug, onsen/partials/change-words-form.
		 *       value is an ID of template
		 * @type {String}
		 * @protected
		 */
		this.changeForm = String;

		/**
		 * @property titleOfNewForm
		 * @type {String}
		 * @protected
		 */
		this.titleOfNewForm = String;
		/**
		 * @property titleOfEditForm
		 * @type {String}
		 * @protected
		 */
		this.titleOfEditForm = String;

		/**
		 * @property selectorOfList
		 * @type {String}
		 * @protected
		 */
		this.selectorOfList = String;
		/**
		 * @property selectorOfChangeItem
		 * @type {String}
		 * @protected
		 */
		this.selectorOfChangeItem = String;

		/**
		 * @property ajaxOfGetAll
		 * @type {{url: String, method: string}}
		 * @protected
		 */
		this.ajaxOfGetAll = {
			url: String,
			method: 'GET'
		};
	}


	/**
	 * @desc Call Global.downAndShow() after that add click event
	 *       listener each showed element what'll pass to changeForm
	 *
	 * @param {function} showableHtml
	 * @param {string} store
	 */
	showItems ({ showableHtml, store })
	{
		this.downAndShow({
			method: this.ajaxOfGetAll.method,
			url: this.ajaxOfGetAll.url,
			showWhere: this.selectorOfList,
			showableHtml: showableHtml,
			store: store,
			after: () =>
			{
				let clickableItems = this.qAll(this.selectorOfChangeItem);
				for (let clickableItem of clickableItems)
				{
					clickableItem.addEventListener('click', () =>
					{
						this.pushPage(this.changeForm, {
							title: this.titleOfEditForm,
							item: window[store].find((item) => item._id == clickableItem.dataset.id),
						}, 'lift');
					});
				}
			}
		});
	}

	/**
	 * @desc Add a click event listener to plusButton for push page to form
	 *       Not called basically
	 */
	initOfPushToForm ()
	{
		this.page.querySelector(this.plusButton)
			.addEventListener('click', () =>
			{
				this.pushPage(this.changeForm, { title: this.titleOfNewForm });
			});
	}

	/**
	 * @desc Send 'titleOfNewForm' and 'titleOfEditForm' arguments to next page automatically
	 *       as titleOfNew and titleOfEdit
	 *
	 * @param {string} where
	 * @param {object} data
	 * @param {string} animation
	 */
	pushPage (where, data = {}, animation = '')
	{
		data.titleOfNew = this.titleOfNewForm;
		data.titleOfEdit = this.titleOfEditForm;

		super.pushPage(where, data, animation);
	}

	postPushBack (page)
	{
		super.postPushBack(page);

		const data = page.data;

		switch (data.event)
		{
			case this.EVENT_ADD_NEW_ITEM:
			{
				const { id, native, learnable } = data.newItem;
				this.setDomElement({ where: this.selectorOfList, html: this.createOnsElement(id, native, learnable) });

				break;
			}
			case this.EVENT_REMOVE_AN_ITEM:
			{
				this.q(`${this.selectorOfChangeItem}[data-id="${data.removedId}"]`).remove();
				break;
			}
			case this.EVENT_EDIT_AN_ITEM:
			{
				const {id,native,learnable,labelId,photo} = data.editedItem;

				const edited = this.q(`${this.selectorOfChangeItem}[data-id="${id}"]`);
				edited.querySelector('.left').innerHTML = native;
				edited.querySelector('.right').innerHTML = learnable;

				break;
			}
			default:
				break;

		}
	}


	/**
	 * @param {string} id
	 * @param {string} native
	 * @param {string} learnable
	 */
	createOnsElement(id, native, learnable)
	{
		return super.createOnsElement(
		    `<ons-list-item data-id=${id} tappable modifier="longdivider">
                <div class="left">${native}</div>
                <div class="center"><ons-icon icon="arrows-h"></ons-icon></div>
                <div class="right">${learnable}</div>
			</ons-list-item>`
        );
	}
}