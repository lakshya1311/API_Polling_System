const express = require('express');
require('dotenv').config();
const app = express();
const { PORT } = process.env;

// use express router
app.use('/', require('./routes'));

app.listen(PORT || 5000, (err) => {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is up and running at ${PORT}`);
});
