const config = require('./config');
const enquiryRouter = require('./routes/enquiry');
const staticRouter = require('./routes/static');
const express = require('express');
const cors = require('cors');
const app = express();
const galleryRouter = require('./routes/gallery');
const contactRouter = require('./routes/contact');
const rateLimit = require('express-rate-limit');


// Middleware
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());

const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message:{ 
        status: "error",
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Minimal Health Route
app.get('/health', (req, res) => {
    // We intentionally make this basic to let our test fail or succeed later
    res.status(200).json({ status: "UP" });
});

// Routes
app.use('/api/enquiries', postLimiter, enquiryRouter);
app.use('/api', staticRouter);
app.use('/api', galleryRouter);
app.use('/api/contact', postLimiter, contactRouter);

// Only start the server if this file is run directly (not via Jest)
if (require.main === module) {
    const PORT = config.PORT;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; // Export for testing
