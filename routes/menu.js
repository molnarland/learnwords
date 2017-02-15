var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next)
{
    res.render(global.onsenViewDirectory + 'menu');
});

module.exports = router;
