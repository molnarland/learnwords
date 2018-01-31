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
		const label = req.body.label;

		await labels.insertOne(req.session.user._id, label);

		res.send(true);

	})
    .put(async (req, res, next) =>
	{
		const userId = req.body.userId; //TODO user id and label name
		const newLabel = req.body.newLabel;
		const oldLabel = req.body.oldLabel;

		await labels.updateOne(userId, oldLabel, newLabel);

		res.send(true);

	})
    .delete(async (req, res, next) =>
    {
        const id = req.body.id;

        await labels.deleteById(id);

        res.send(true);
    });

module.exports = router;