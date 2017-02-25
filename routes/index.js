const express = require('express');
const router = express.Router();

let User = require('../database/User');
User = new User();

router.route('/')
    .get((req, res, next) =>
    {
        res.render(global.onsenViewDirectory + 'index');
    })
    .post((req, res, next) =>
    {
        const name = req.body.name;

        User.findName(name, (result) =>
        {
            if (result)
            {
                User.findNameMaybeInsert(name, (result) =>
                {
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
        res.render(global.onsenViewDirectory + 'start', { name: req.session.user.name });
    })
    .post((req, res, next) =>
    {
        const name = req.body.name,
            native = req.body.native,
            learnable = req.body.learnable;

        User.insertNameWithDatas(name, native, learnable, () =>
        {
            User.findName(name, (result) =>
            {
                req.session.user = result;

                res.redirect('/menu');
            });
        });
    });


module.exports = router;
