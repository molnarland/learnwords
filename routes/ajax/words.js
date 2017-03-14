let express = require('express');
let router = express.Router();

let Words = require('../../database/Word');
Words = new Words();

router.get('/all', (req, res, next) =>
{
    Words.getAllWords((result) =>
    {
        res.send(result);
    });
});


module.exports = router;