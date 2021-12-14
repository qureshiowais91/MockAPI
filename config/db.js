const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGOURI);
  return conn;// mongoose.connect(process.env.MONGOURI).then((conn) => {
  //   console.log(`mongoDB Connected ${conn.connection.host}`);
  // }).catch((err)=>{
  //   console.log(`Error : ${err}`);
  // })
};

module.exports = connectDB;
