let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) =>
{
    res.render('menu', { user: req.session.user });
});

module.exports = router;
