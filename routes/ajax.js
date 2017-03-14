const router = require('express').Router();

const words = require('./ajax/words');
const labels = require('./ajax/labels');


router.use('/words', words);
router.use('/labels', labels);


module.exports = router;