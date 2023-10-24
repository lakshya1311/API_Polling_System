const mongoose = require('mongoose');

const connectWithDb = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/API-Polling', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB connected successfully`))
    .catch((error) => {
      console.log(`DB connection failed`);
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectWithDb
