const router = require('express').Router();

const login  = require('./api/login');
const words = require('./api/words');
const labels = require('./api/labels');
const files = require('./api/files');

router.use('/login', login);
router.use('/words', words);
router.use('/labels', labels);
router.use('/files', files);

module.exports = router;