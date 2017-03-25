let express = require('express');
let router = express.Router();

let Words = require('../../database/Word');
Words = new Words();

router.get('/all', (req, res, next) =>
{
    Words.getAllWords((result) =>
    {
        res.send({result});
    });
});

router.post('/', (req, res, next) =>
{
    const userId = req.session.user._id;
    const native = req.body.native;
    const learnable = req.body.learnable;
    const labelId = req.body.label;
    const photo = req.body.photo;

    Words.insertWord(userId, native, learnable, photo, labelId, () =>
    {
        res.send(true);
    });
});


module.exports = router;