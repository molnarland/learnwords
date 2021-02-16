const express = require('express');
const router = express.Router();
const fs = require('fs');
const User = require('../../database/User');

router.post('/login', async (req, res) => {
  const user = new User();
  const response = await user.get(req.body.userName);

  res.send({ user: response });
});

router.post('/signup', async (req, res) => {
  const { userName, nativeLanguage, learnLanguage } = req.body;
  const user = new User();
  const response = await user.set(userName, nativeLanguage, learnLanguage);

  res.send({ success: response.result.ok === 1, userId: response.insertedId });
});

router.get('/user', async (req, res) => {
  const { userName } = req.body;
  const user = new User();
  const response = await user.get(userName);

  res.send({ user: response });
})

module.exports = router;
