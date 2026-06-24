import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Replace <db_password> with the actual password via environment variable
    const uri = process.env.MONGODB_URI || `mongodb+srv://fsadmin:${process.env.MONGODB_PASSWORD}@festival-event-manageme.as8lgqr.mongodb.net/?appName=Festival-Event-Management-Company-Website`;
    
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
