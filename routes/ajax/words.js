let express = require('express');
let router = express.Router();

let Words = require('../../database/Word');
Words = new Words();

router.route('/')
    .get((req, res, next) =>
    {
        Words.getAllWords(global.getUserId(req), (result) =>
        {
            res.send(result);
        });
    })
    .post((req, res, next) =>
    {
        const userId = global.getUserId(req);
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