import ons from 'onsenui';

import Menu from './Menu';
import ListWords from './ListWords';
import ChangeWordsForm from './ChangeWordsForm';
import ListLabels from './ListLabels';
import ChangeLabelsForm from './ChangeLabelsForm';
import Learn from './Learn';
import Quiz from './Quiz';


window.labels = [];
window.posts = [];

document.addEventListener('init', (event) =>
{
    const platform = ons.platform;
    let body = document.querySelector('body');
    if (platform.isAndroid()) {body.className = 'android';}
    else {body.className = 'ios';}


    const page = event.target;

    router(page, {
        'menu': Menu,
        'change-words': ListWords,
        'change-words-form': ChangeWordsForm,
        'change-labels': ListLabels,
        'change-label-form': ChangeLabelsForm,
        'learn': Learn,
        'quiz': Quiz
    });
});

/**
 * Call classes
 * If require here these objects, will be slow!
 *
 * @param {object} page
 * @param {object} routes
 */
function router(page, routes)
{
    const id = page.id;
    const currentRoute = routes[id];

    if (!currentRoute)
    {
        return console.error(`This route id (${id}) does not exist!`);
    }

    new currentRoute(page);
}