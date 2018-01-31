const express = require('express');
const router = express.Router();
const crypto = require('crypto');

let User = require('../database/User');
User = new User();


router.route('/')
    .get((req, res, next) =>
    {
        res.render('index');
    })
    .post((req, res, next) =>
	{
		const name = req.body.name;
		const password = crypto.createHash('sha256').update(req.body.password).digest('hex');

		console.log(password);

		User.getOne(name, (resultJustWithName) =>
		{
				User.getOneWithPassword(name, password, (resultWithNameAndPassword) =>
				{
					if (resultWithNameAndPassword)
					{
						User.findUserMaybeInsert(name, (result) =>
						{
							result.native = uppercaseFirstCharAndLowerOthers(result.native);
							result.learnable = uppercaseFirstCharAndLowerOthers(result.learnable);

							req.session.user = result;

							res.redirect('/menu');
						});
					}
					else if (resultJustWithName && !resultWithNameAndPassword)
					{
						res.render('index', { error: 'User found but password is not correct' });
					}
					else
					{
						req.session.user = { name, password };

						res.redirect('/start');
					}
				});
		});
	});

router.route('/start')
    .get((req, res, next) =>
    {
        res.render('start', { name: req.session.user.name, password: req.session.user.password });
    })
    .post((req, res, next) =>
    {
        const name = req.body.name;
        const password = req.body.password;
        const native = req.body.native;
        const learnable = req.body.learnable;

        User.insertOne(name, password, native, learnable, () =>
        {
            User.getOne(name, (result) =>
            {
                req.session.user = result;

                res.redirect('/menu');
            });
        });
    });


const uppercaseFirstCharAndLowerOthers = function (string)
{
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
};

module.exports = router;
