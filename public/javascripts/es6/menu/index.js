import ons from 'onsenui';

import Menu from './Menu';
import ChangeWords from './ChangeWords';
import ChangeWordsForm from './ChangeWordsForm';
import ChangeLabels from './ChangeLabels';
import ChangeLabelsForm from './ChangeLabelsForm';

window.labels = [];
window.posts = [];

document.addEventListener('init', (event) =>
{
    const platform = ons.platform;
    let body = document.querySelector('body');
    if (platform.isAndroid()) {body.className = 'android';}
    else {body.className = 'ios';}


    const page = event.target;


    switch (page.id)
    {
        case 'menu':
            new Menu(page);
            break;
        case 'change-words':
            new ChangeWords(page);
            break;
        case 'change-words-form':
            new ChangeWordsForm(page);
            break;
        case 'change-labels':
            new ChangeLabels(page);
            break;
        case 'change-label-form':
            new ChangeLabelsForm(page);
            break;
        default:
            break;
    }
});
