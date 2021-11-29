const express = require('express');
const router = express.Router();
const path = require('path');
const apiRouter = require('./api');

router.get('/', (req, res) => {
	res.sendFile(path.join(`${__dirname}/../public/src/index.html`));
});

router.use('/api/v1', apiRouter);

module.exports = router;
