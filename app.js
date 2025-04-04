// app.js
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, server is running!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
