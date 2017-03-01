import ons from 'onsenui';


import Menu from './Menu';
import ChangeWords from './ChangeWords';
import ChangeWordsForm from './ChangeWordsForm';
import ChangeLabels from './ChangeLabels';
import ChangeLabelsForm from './ChangeLabelsForm';

document.addEventListener('init', function (event)
{
    const page = event.target;


    /*const selectorOfBackButton = '.left ons-back-button';
    const objectOfModal =  {
        animation: 'fade',
        animationOptions: {timing: 'ease-in'}
    };*/

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
            console.log('ewewew');
            new ChangeLabels(page);
            break;
        case 'change-label-form':
            new ChangeLabelsForm(page);
            break;
        default:
            break;
    }
});