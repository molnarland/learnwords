var express = require('express');
var router = express.Router();

var MongoDB = require('../database/MongoDB');
var mongo = new MongoDB();

router.get('/', function(req, res, next)
{
    res.render('index');
});

router.post('/', function (req, res, next)
{
    mongo.findName(req.body.name, function (result)
    {
        req.userId = result._id;

        res.redirect('/menu');
    });
});

module.exports = router;
