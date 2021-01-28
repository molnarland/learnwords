const router = require('express').Router();

const Labels = require('../../database/Label');
const labels = new Labels();


router.route('/')
    .get(async (req, res, next) =>
	{
		result = await labels.getAll(req.session.user._id);

		res.send(result);
	})
    .post(async (req, res, next) =>
	{
		const label = req.body.name;
		const userId = global.getUserId(req);

		try
		{
			const result = await labels.insertOne(userId, label);

			res.send({ success: true, insertedId: result.insertedId, userId });
		}
		catch (message)
		{
			res.send({ success: false, message })
		}
	})
    .put(async (req, res, next) =>
	{
		const userId = req.body.userId; //TODO user id and label name
		const newLabel = req.body.name;
		const id = req.body.id;

		try
		{
			await labels.updateOne(id, userId, newLabel);

			res.send(true);
		}
		catch (message)
		{
			res.send(false);
		}
	})
    .delete(async (req, res, next) =>
	{
		const id = req.body.id;

		try
		{
			await labels.deleteById(id);

			res.send(true);
		}
		catch (message)
		{
			res.send(false);
		}
	});

module.exports = router;