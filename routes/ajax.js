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

    Labels.insertLabel(label, () =>
    {
        res.send(true);
    });
});

module.exports = router;


function initClass(file)
{
    let object = require(file);
    return new object();
}