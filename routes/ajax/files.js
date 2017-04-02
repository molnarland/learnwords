const router = require('express').Router();
const upload = require('multer')({storage: global.multerDiskStorage('public/photos/')});
const fs = require('fs');

router.route('/photo')
    .post(upload.single('file'), (req, res, next) =>
    {
        res.send(req.file.filename);
    })
    .put(upload.single('file'), (req, res, next) =>
    {
        console.log(req.file);
        res.send(req.file.filename);
    });

module.exports = router;