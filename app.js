const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

app.get('/', (req, res) => {
    res.json([
        {
            name: "Yousef Alfaili"
        }
    ]);
})

app.listen(PORT, () => {
    console.log(`The application is running on http://localhost:${PORT}`);
});