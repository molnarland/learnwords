const express = require('express');
const router = express.Router();

let User = require('../database/User');
User = new User();


router.route('/')
    .get((req, res, next) =>
    {
        res.render(global.getCurrentView() + 'index');
    })
    .post((req, res, next) =>
    {
        const name = req.body.name;

        User.getOne(name, (result) =>
        {
            if (result)
            {
                User.findNameMaybeInsert(name, (result) =>
                {
                    result.native = uppercaseFirstCharAndLowerOthers(result.native);
                    result.learnable = uppercaseFirstCharAndLowerOthers(result.learnable);

                    req.session.user = result;

                    res.redirect('/menu');
                });
            }
            else
            {
                req.session.user = { name: name };

                res.redirect('/start');
            }
        });
    });

router.route('/start')
    .get((req, res, next) =>
    {
        res.render(global.getCurrentView() + 'start', { name: req.session.user.name });
    })
    .post((req, res, next) =>
    {
        const name = req.body.name,
            native = req.body.native,
            learnable = req.body.learnable;

        User.insertOne(name, native, learnable, () =>
        {
            User.getOne(name, (result) =>
            {
                req.session.user = result;

                res.redirect('/menu');
            });
        });
    });

router.get('/heart', (req, res, next) =>
{
    res.render('heart');
});

const uppercaseFirstCharAndLowerOthers = function (string)
{
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
};

module.exports = router;
