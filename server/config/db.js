import mongoose from "mongoose";

const connectToDB = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true});
  mongoose.connection.on('open', () => {
    console.log("Database Connected");
  })
};

export default connectToDB;
