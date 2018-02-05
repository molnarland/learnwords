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
    .post(async (req, res, next) =>
	{
		const userId = global.getUserId(req);
		const native = req.body.native;
		const learnable = req.body.learnable;
		const labelId = req.body.label;
		const photo = req.body.photo;

        /*const result = */await words.insertOne(userId, native, learnable, photo, labelId);

		res.send(true);
	})
    .put(async (req, res, next) =>
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

        /*const result = */await words.updateOne(id, native, learnable, photo, labelId);

        res.send(true);
    })
    .delete(async (req, res, next) =>
    {
        const id = req.body.id;

        deletePhoto(id);

        /*const result = */await words.deleteById(id);

        res.send(true);
    });


router.get('/game/:labelId/:sort/:first', async (req, res, next) =>
{
    const userId = global.getUserId(req);
    const labelId = req.params.labelId;
    const sort = Number(req.params.sort);
    const showFirst = Boolean(req.params.first);

	res.send(await words.getWithSort(userId, labelId, sort, showFirst));
});


module.exports = router;


/**
 *
 * @param id
 * @return {Promise<boolean>}
 */
function deletePhoto (id)
{
    return new Promise((resolve) =>
	{
		 words.getById(id).then((result) =>
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
							 return resolve(true);
						 });
					 }

					 return resolve(false);
				 });
			 }
		 });

		 return resolve(false);
	});
}