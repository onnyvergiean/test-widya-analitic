require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const routers = require('./router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
