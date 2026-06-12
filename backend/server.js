require('dotenv').config();
const enquiryRouter = require('./routes/enquiry');
const staticRouter = require('./routes/static');
const express = require('express');
const cors = require('cors');
const expressrateLimit = require('express-rate-limit');
const app = express();


// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

const limiter = expressrateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: { error: "Too many requests, please try again after 15 minutes." }
});
app.use('*', limiter);

// Minimal Health Route
app.get('/health', (req, res) => {
    // We intentionally make this basic to let our test fail or succeed later
    res.status(200).json({ status: "UP" });
});

// Routes
app.use('/api/enquiries', enquiryRouter);
app.use('/api', staticRouter);

// Only start the server if this file is run directly (not via Jest)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; // Export for testing

