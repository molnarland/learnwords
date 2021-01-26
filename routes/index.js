const express = require('express');
const router = express.Router();
const path = require('path');

let User = require('../database/User');
User = new User();


router.get('/', (req, res, next) =>
    {
    	console.log('mivaaan');
    	res.sendFile(path.join(`${__dirname}/public/index.html`));
    });

module.exports = router;
