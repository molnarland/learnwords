const router = require('express').Router();
const upload = require('multer')({storage: global.multerDiskStorage(global.photoDirectory)});
const fs = require('fs');

router.route('/photo')
    .post(upload.single('file'), (req, res, next) =>
    {
        res.send(req.file.filename);
    })
    .put(upload.single('file'), (req, res, next) =>
    {
        res.send(req.file.filename);
    });

module.exports = router;