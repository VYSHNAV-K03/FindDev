const mongoose = require("mongoose");

const DB = process.env.COS_DB;

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connected successful`);
  })
  .catch((err) => console.log(`not connected`));
