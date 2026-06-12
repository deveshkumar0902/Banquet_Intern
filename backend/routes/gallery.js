const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/gallery', (req, res) => {
    const galleryPath = path.join(__dirname, '..', 'public', 'gallery');
    const files = fs.readdirSync(galleryPath);
    const imagesFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
    });
    
const imageUrls = imagesFiles.map(file => `/gallery/${file}`);
    res.json(imageUrls);
});

module.exports = router;