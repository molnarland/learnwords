const express = require('express');
const router = express.Router();
const fs = require('fs');

const Words = require('../../database/Word');
const words = new Words();

router.route('/')
    .get(async (req, res, next) =>
    {
		return res.send(await words.getAll(global.getUserId(req)));
    })
    .post((req, res, next) =>
    {
        const userId = global.getUserId(req);
        const native = req.body.native;
        const learnable = req.body.learnable;
        const labelId = req.body.label;
        const photo = req.body.photo;

        words.insertOne(userId, native, learnable, photo, labelId, (/*result*/) =>
        {
            res.send(true);
        });
    })
    .put((req, res, next) =>
    {
        const body = req.body;

        const id = body.id;
        const native = body.native;
        const learnable = body.learnable;
        const labelId = body.label;
        const photo = body.photo || null;

        if (photo)
        {
            deletePhoto(id);
        }

        words.updateOne(id, native, learnable, photo, labelId, (/*result*/) =>
        {
            res.send(true);
        });
    })
    .delete((req, res, next) =>
    {
        const id = req.body.id;

        deletePhoto(id);

        words.deleteById(id, (/*result*/) =>
        {
            res.send(true);
        });
    });


router.get('/game/:labelId/:sort/:first', (req, res, next) =>
{
    const userId = global.getUserId(req);
    const labelId = req.params.labelId;
    const sort = Number(req.params.sort);
    const showFirst = Boolean(req.params.first);

    words.getWithSort(userId, labelId, sort, showFirst, (results) =>
    {
        res.send(results);
    });
});


module.exports = router;



function deletePhoto (id, callback = new Function())
{
    words.getById(id, (result) =>
    {
        if (result)
        {
            const photo = global.photoDirectory + result.photo;
            fs.exists(photo, (exists) =>
            {
                if (exists)
                {
                    fs.unlink(photo, () =>
                    {
                        return callback(true);
                    });
                }

                return callback(false);
            });
        }
    });
}