if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routers/router');
const cors = require('cors');
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router);
app.use(errorHandler);

// Gunakan Saat Production!
app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});

module.exports = app;