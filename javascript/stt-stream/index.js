const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "localhost", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
