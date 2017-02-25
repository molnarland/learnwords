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

module.exports = router;


function initClass(file)
{
    let object = require(file);
    return new object();
}