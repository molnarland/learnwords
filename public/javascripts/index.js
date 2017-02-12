(function ()
{
    document.getElementById('name').value = Cookies.get('name') || '';
}());



document.getElementById('form').addEventListener('submit', function (e)
{
    Cookies.set('name', document.getElementById('name').value);
});