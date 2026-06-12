const express  = require('express');
const router = express.Router();
const path = require('path');

router.get('/about', (req, res) => {
    const data = require(path.join(__dirname, '..', 'data', 'about.json'));
    res.json(data)
});

router.get('/services', (req, res) => {
    const data = require(path.join(__dirname, '..', 'data', 'services.json'));
    res.json(data)
});

module.exports = router;