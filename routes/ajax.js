let express = require('express');
let router = express.Router();

let Words = initClass('../database/Word');
let Labels = initClass('../database/Label');

router.get('/all-words', (req, res, next) =>
{
    Words.getAllWords((result) =>
    {
        res.send(result);
    });
});


router.post('/save-label', (req, res, next) =>
{
    const label = req.body.label;

    Labels.insertLabel(req.session.user._id, label, () =>
    {
        res.send(true);
    });
});

router.get('/all-labels', (req, res, next) =>
{
    Labels.getAllLabels(req.session.user._id, (result) =>
    {
        res.send(result);
    });
});

router.post('/update-label', (req, res, next) =>
{
    const userId = req.body.userId; //TODO user id and label name
    const newLabel = req.body.newLabel;
    const oldLabel = req.body.oldLabel;

    Labels.updateLabel(userId, oldLabel, newLabel, () =>
    {
        res.send(true);
    })
});

router.post('/delete-label', (req, res, next) =>
{
    const id = req.body.id;

    Labels.deleteLabel(id, () =>
    {
        res.send(true);
    })
});

module.exports = router;


function initClass(file)
{
    let object = require(file);
    return new object();
}