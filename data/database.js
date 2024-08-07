import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backendapi",
    })
    .then((s) => {
      console.log(`Database Connected with ${s.connection.host}`);
    })
    .catch((e) => {
      console.log("error while connecting database: ", e);
    });
};
