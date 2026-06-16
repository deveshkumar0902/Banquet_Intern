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

router.get('/venues', (req, res) => {
    const data = require(path.join(__dirname, '..', 'data', 'venues.json'));
    res.json(data)
});

router.get('/packages', (req, res) => {
    const data = require(path.join(__dirname, '..', 'data', 'packages.json'));
    res.json(data)
});

router.get('/testimonials', (req, res) => {
    const data = require(path.join(__dirname, '..', 'data', 'testimonials.json'));
    res.json(data)
});

module.exports = router;