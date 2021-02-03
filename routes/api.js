const router = require('express').Router();

const auth  = require('./api/auth');
const words = require('./api/words');
const labels = require('./api/labels');
const files = require('./api/files');

router.use('/auth', auth);
router.use('/words', words);
router.use('/labels', labels);
router.use('/files', files);

module.exports = router;