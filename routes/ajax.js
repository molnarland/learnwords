var express = require('express');
var router = express.Router();

var Words = require('../database/Words');
Words = new Words();

router.get('/all-words', function (req, res, next)
{
    Words.getAllWords(function (result)
    {
        res.send(result);
    });
});

module.exports = router;
