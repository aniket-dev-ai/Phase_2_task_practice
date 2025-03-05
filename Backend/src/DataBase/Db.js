const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb is Connected ❤️");
  } catch (error) {
    console.error("MongoDb Connection Error ❌:", error);
    process.exit(1);
  }
};
