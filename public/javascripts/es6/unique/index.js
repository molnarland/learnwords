import Framework from './Framework/index';


let framework = new Framework({
    pushPage: (id, data) =>
    {
        console.log(id);
    }
});

console.log(framework);
framework.navigator.pushPage('menu');

document.querySelector('#foo').addEventListener('click', () =>
{
    document.querySelector('#navigator').pushPage('foo');

    document.querySelector('#back').addEventListener('click', () =>
    {
        document.querySelector('#navigator').popPage();
    })
});