var express = require('express');
var router = express.Router();

var User = require('../database/User');
User = new User();

router.route('/')
    .get(function(req, res, next)
    {
        res.render(global.onsenViewDirectory + 'index');
    })
    .post(function (req, res, next)
    {
        var name = req.body.name;

        User.findName(name, function (result)
        {
            if (result)
            {
                User.findNameMaybeInsert(name, function (result)
                {
                    global.user = result;

                    res.redirect('/menu');
                });
            }
            else
            {
                global.user = {name: name};

                res.redirect('/start');
            }
        });
    });

router.route('/start')
    .get(function (req, res, next)
    {
        res.render(global.onsenViewDirectory + 'start', {name: global.user.name});
    })
    .post(function (req, res, next)
    {
        var name = req.body.name,
            native = req.body.native,
            learnable = req.body.learnable;

        User.insertName(name, native, learnable, function ()
        {
            User.findName(name, function (result)
            {
                console.log(result);
                global.user = result;

                res.redirect('/menu');
            });
        });
    });


module.exports = router;
