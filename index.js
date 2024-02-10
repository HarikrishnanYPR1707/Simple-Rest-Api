const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

// Routes

app.listen(port, () => console.log("Server Started!!"));
