module.exports = function (req, res, next)
{
    if (!global.user)
    {
        res.redirect('/');
    }
    else
    {
        next();
    }
};