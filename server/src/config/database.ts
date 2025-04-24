import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crypto-lead';
    
    await mongoose.connect(mongoURI);
    console.info('MongoDB connected successfully');
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', async () => {
      await mongoose.connection.close();
      console.warn('MongoDB disconnected');
      process.exit(0);
    });
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB; 