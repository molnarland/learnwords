const router = require('express').Router();
const upload = require('multer')({storage: global.multerDiskStorage('photos/')});
const fs = require('fs');

router.post('/photo', upload.single('file'), (req, res, next) =>
{
    res.send(req.file.filename);
});

module.exports = router;