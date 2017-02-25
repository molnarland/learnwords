let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) =>
{
    res.render(global.onsenViewDirectory + 'menu', { user: req.session.user });
});

module.exports = router;
