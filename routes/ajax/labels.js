const router = require('express').Router();

let Labels = require('../../database/Label');
Labels = new Labels();


router.route('/')
    .get((req, res, next) =>
    {
        Labels.getAllLabels(req.session.user._id, (result) =>
        {
            res.send(result);
        });
    })
    .post((req, res, next) =>
    {
        const label = req.body.label;

        Labels.insertLabel(req.session.user._id, label, () =>
        {
            res.send(true);
        });
    })
    .put((req, res, next) =>
    {
        const userId = req.body.userId; //TODO user id and label name
        const newLabel = req.body.newLabel;
        const oldLabel = req.body.oldLabel;

        Labels.updateLabel(userId, oldLabel, newLabel, () =>
        {
            res.send(true);
        })
    })
    .delete((req, res, next) =>
    {
        const id = req.body.id;

        Labels.deleteLabel(id, () =>
        {
            res.send(true);
        })
    });

module.exports = router;