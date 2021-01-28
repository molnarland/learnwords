const express = require('express');
const router = express.Router();
const fs = require('fs');
const User = require('../../database/User');

router.post('/', async (req, res) => {
	const user = new User();
	const response = await user.get(req.body.userName);

	res.send({user: response});
});

module.exports = router;
