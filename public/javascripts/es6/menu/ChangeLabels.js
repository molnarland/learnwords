import Global from './Global';

export default class ChangeLabels extends Global
{
    constructor(page)
    {
        super(page);

        this.plusLabelButton = '#plus-label';
        this.changeLabelForm = 'change-label-form';

        this.titleOfNewLabelsForm = 'New label';
        this.titleOfEditLabelsForm = 'Edit label';

        this.selectorOfLabelList = '#change-labels-items';
        this.selectorOfChangeItem = `${this.selectorOfLabelList} ons-list-item`;

        this.ajaxOfGetAllLabels = {
            url: `${this.urlOfLabelMethods}/`,
            method: 'GET'
        };

        this.init();
    }

    init ()
    {
        this.showLabels();
        this.initOfPushToForm();
    }

    showLabels ()
    {
        this.downAndShow({
            url: this.ajaxOfGetAllLabels.url,
            showWhere: this.selectorOfLabelList,
            showableHtml: (label) =>
            {
                const id = label._id;
                const name = label.name;

                return this.createOnsElement(
                    `<ons-list-item data-id="${id}" tabbable>
                        <div class="center">${name}</div>
                        <div class="right"><ons-icon icon="ion-edit"></ons-icon></div>
                    </ons-list-item>`
                );
            },
            store: 'labels',
            after: () =>
            {
                let clickableItems = this.q(this.selectorOfChangeItem);
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
    }

    initOfPushToForm ()
    {
        this.page.querySelector(this.plusLabelButton).addEventListener('click', () =>
        {
            this.pushPage(this.changeLabelForm, { title: this.titleOfNewLabelsForm });
        });
    }

    /**
     * Send 'titleOfNewLabelsForm' and 'titleOfEditLabelsForm' arguments to next page automatically
     * as titleOfNew and titleOfEdit
     *
     * @param {string} where
     * @param {object} data
     * @param {string} animation
     */
    pushPage (where, data = {}, animation = '')
    {
        data.titleOfNew = this.titleOfNewLabelsForm;
        data.titleOfEdit = this.titleOfEditLabelsForm;

        super.pushPage(where, data, animation);
    }
}