const router = require('express').Router();

const Labels = require('../../database/Label');
const labels = new Labels();


router.route('/')
    .get((req, res, next) =>
    {
        labels.getAll(req.session.user._id, (result) =>
        {
            res.send(result);
        });
    })
    .post((req, res, next) =>
    {
        const label = req.body.label;

        labels.insertOne(req.session.user._id, label, () =>
        {
            res.send(true);
        });
    })
    .put((req, res, next) =>
    {
        const userId = req.body.userId; //TODO user id and label name
        const newLabel = req.body.newLabel;
        const oldLabel = req.body.oldLabel;

        labels.updateOne(userId, oldLabel, newLabel, () =>
        {
            res.send(true);
        })
    })
    .delete((req, res, next) =>
    {
        const id = req.body.id;

        labels.deleteById(id, () =>
        {
            res.send(true);
        })
    });

module.exports = router;