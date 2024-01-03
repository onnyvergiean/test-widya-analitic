require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3000;
const routers = require('./router');

app.use(
  session({
    secret: 'kucinglucu',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
