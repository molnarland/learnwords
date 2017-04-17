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
            url: `${this.urlOfLabelMethods}/`,
            method: 'GET'
        };

        this.init();
    }

    init ()
    {
        this.showItems();
        this.initOfPushToForm();
    }

    showItems ()
    {
        super.showItems({
            showableHtml: (label) =>
            {
                const id = label._id;
                const name = label.name;

                return this.createOnsElement(
                    `<ons-list-item data-id="${id}" tappable modifier="longdivider">
                        <div class="center">${name}</div>
                        <div class="right"><ons-icon icon="ion-edit"></ons-icon></div>
                    </ons-list-item>`
                );
            },
            store: 'labels'
        });
    }

    /*showLabels ()
    {
        this.downAndShow({
            url: this.ajaxOfGetAllLabels.url,
            showWhere: this.selectorOfLabelList,
            showableHtml: (label) =>
            {
                const id = label._id;
                const name = label.name;

                return this.createOnsElement(
                    `<ons-list-item data-id="${id}" tappable>
                        <div class="center">${name}</div>
                        <div class="right"><ons-icon icon="ion-edit"></ons-icon></div>
                    </ons-list-item>`
                );
            },
            store: 'labels',
            after: () =>
            {
                let clickableItems = this.qAll(this.selectorOfChangeItem);
                for (let clickableItem of clickableItems)
                {
                    clickableItem.addEventListener('click', () =>
                    {
                        this.pushPage(this.changeLabelForm, {
                            title: this.titleOfEditLabelsForm,
                            item: window.labels.find((label) => label._id == clickableItem.dataset.id),
                        }, 'lift');
                    });
                }
            }
        });
    }*/

    /*initOfPushToForm ()
    {
        this.page.querySelector(this.plusLabelButton).addEventListener('click', () =>
        {
            this.pushPage(this.changeLabelForm, { title: this.titleOfNewLabelsForm });
        });
    }*/

    /**
     * Send 'titleOfNewLabelsForm' and 'titleOfEditLabelsForm' arguments to next page automatically
     * as titleOfNew and titleOfEdit
     *
     * @param {string} where
     * @param {object} data
     * @param {string} animation
     */
    /*pushPage (where, data = {}, animation = '')
    {
        data.titleOfNew = this.titleOfNewLabelsForm;
        data.titleOfEdit = this.titleOfEditLabelsForm;

        super.pushPage(where, data, animation);
    }*/
}