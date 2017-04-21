const router = require('express').Router();

const words = require('./ajax/words');
const labels = require('./ajax/labels');
const files = require('./ajax/files');

router.get('/:unique', (req, res, next) =>
{
    if (req.params.unique == 1)
    {
        global.currentView = 'unique';
    }

    res.send(null);
});

router.use('/words', words);
router.use('/labels', labels);
router.use('/files', files);


module.exports = router;