import mongoose from "mongoose";


async function connectDb(url) {
  try {
    await mongoose.connect(url)
    console.log("Connected to MongoDb successfully")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
    
  }
}

export default connectDb;