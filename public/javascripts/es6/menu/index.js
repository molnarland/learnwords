import ons from 'onsenui';

import Menu from './Menu';
import ListWords from './List/ListWords';
import WordsForm from './Form/WordsForm';
import ListLabels from './List/ListLabels';
import LabelsForm from './Form/LabelsForm';
import SettingsLearn from './GameSettings/SettingsLearn';
import Learn from './Game/Learn';
import Quiz from './Game/Quiz';
import Settings from './Settings';


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
        'settings-learn': SettingsLearn,
        'learn': Learn,
        'quiz': Quiz,
        'settings': Settings
    }, ['learnable', 'native']);
});

/**
 * Call classes
 * If require here these objects, will be slow!
 *
 * @param {object} page
 * @param {object} routes
 * @param {array} ignore
 */
function router(page, routes, ignore)
{
    if (ignore.indexOf(page.id) < 0)
    {
        let id = page.id;
        let currentRoute = routes[id];

        if (!currentRoute)
        {
            return console.error(`This route id (${id}) does not exist!`);
        }

        if (typeof currentRoute === 'function')
        {
            new currentRoute(page);
        }
    }
}