// ⚠️  DEPRECATED — This file is the old legacy entry point.
//     Use server.js instead:
//        npm start     →  node server.js
//        npm run dev   →  nodemon server.js
//     (app.js only has a test route and is kept for reference.)

const express = require('express');
const app = express();
const PORT = 3000;

// 1. Parses incoming requests with JSON payloads (e.g., API calls)
app.use(express.json());

// 2. Parses incoming requests with URL-encoded payloads (e.g., standard HTML Form submissions)
app.use(express.urlencoded({ extended: true }));

// Example POST route to test reading the request body
app.post('/api/test', (req, res) => {
    // Thanks to the middleware above, data is automatically accessible inside req.body
    console.log(req.body); 
    res.json({
        message: "Data received successfully!",
        receivedData: req.body
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
