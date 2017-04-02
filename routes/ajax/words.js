let express = require('express');
let router = express.Router();

let Words = require('../../database/Word');
Words = new Words();

router.route('/')
    .get((req, res, next) =>
    {
        Words.getAll(global.getUserId(req), (result) =>
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

        Words.insertWord(userId, native, learnable, photo, labelId, (/*result*/) =>
        {
            res.send(true);
        });
    })
    .put((req, res, next) =>
    {
        const body = req.body;

        const userId = global.getUserId(req);
        const newNative = body.newNative;
        const oldNative = body.oldNative;
        const newLearnable = body.newLearnable;
        const oldLearnable = body.oldLearnable;
        const labelId = body.label;
        const newPhoto = body.newPhoto || null;
        const oldPhoto = body.oldPhoto || null;

        console.log(userId, newNative, oldNative, newLearnable, oldLearnable, labelId, newPhoto, oldPhoto);


    });


module.exports = router;