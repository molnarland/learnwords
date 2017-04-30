const router = require('express').Router();

const words = require('./ajax/words');
const labels = require('./ajax/labels');
const files = require('./ajax/files');


router.use('/words', words);
router.use('/labels', labels);
router.use('/files', files);


router.get('/:unique', (req, res, next) =>
{
    const unique = Number(req.params.unique);
    if (unique === 1)
    {
        global.currentView = 'unique';
    }

    res.send(null);
});


module.exports = router;