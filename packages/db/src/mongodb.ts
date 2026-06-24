import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || `mongodb+srv://fsadmin:${process.env.MONGODB_PASSWORD}@festival-event-manageme.as8lgqr.mongodb.net/?appName=Festival-Event-Management-Company-Website`;
    
    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${(error as Error).message}`);
    // Do not exit process here during development/testing to allow server to start, 
    // but log clearly so we can see the error in logs.
  }
};

export default connectDB;
