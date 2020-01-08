const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hi there!');
});

module.exports = router;
