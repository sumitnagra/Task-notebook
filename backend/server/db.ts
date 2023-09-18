import mongoose, { Connection } from "mongoose";

const uri: string = "mongodb+srv://sumitnagra:sumit0004@cluster0.l3yrn89.mongodb.net/";

async function connectMongo(): Promise<Connection> {
  try {
    await mongoose.connect(uri, { bufferCommands: true });
    const connection: Connection = mongoose.connection;
    console.log('Connected to MongoDB');
    // Perform other operations after connection
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectMongo;
