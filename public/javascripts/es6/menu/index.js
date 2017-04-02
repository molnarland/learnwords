import ons from 'onsenui';

import Menu from './Menu';
import ListWords from './ListWords';
import WordsForm from './WordsForm';
import ListLabels from './ListLabels';
import LabelsForm from './LabelsForm';
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
        'change-words-form': WordsForm,
        'change-labels': ListLabels,
        'change-label-form': LabelsForm,
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
    let id = page.id;
    let currentRoute = routes[id];

    if (!currentRoute)
    {
        return console.error(`This route id (${id}) does not exist!`);
    }

    new currentRoute(page);
}