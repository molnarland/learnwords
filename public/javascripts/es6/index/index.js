import Cookies from 'js-cookie';


window.location.hash = '';
document.getElementById('name').value = Cookies.get('name') || '';



document.getElementById('form').addEventListener('submit', function (e)
{
    Cookies.set('name', document.getElementById('name').value);
});