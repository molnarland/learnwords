const express = require('express');
const router = express.Router();

let User = require('../database/User');
User = new User();


router.route('/')
    .get((req, res, next) =>
    {
        res.render('index');
    })
    .post(async (req, res, next) =>
	{
		const name = req.body.name;

		let result = await User.getOne(name);

		if (result)
		{
			result = await User.findNameMaybeInsert(name);

			result.native = uppercaseFirstCharAndLowerOthers(result.native);
			result.learnable = uppercaseFirstCharAndLowerOthers(result.learnable);

			req.session.user = result;

			res.redirect('/menu');
		}
		else
		{
			req.session.user = { name: name };

			res.redirect('/start');
		}
	});

router.route('/start')
    .get((req, res, next) =>
    {
        res.render('start', { name: req.session.user.name });
    })
    .post(async (req, res, next) =>
	{
		const name = req.body.name;
		const native = req.body.native;
		const learnable = req.body.learnable;

		await User.insertOne(name, native, learnable);

		req.session.user = await User.getOne(name);

		res.redirect('/menu');
	});


const uppercaseFirstCharAndLowerOthers = function (string)
{
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
};

module.exports = router;
