const router = require('express').Router();

const words = require('./ajax/words');
const labels = require('./ajax/labels');
const files = require('./ajax/files');


router.use('/words', words);
router.use('/labels', labels);
router.use('/files', files);


module.exports = router;