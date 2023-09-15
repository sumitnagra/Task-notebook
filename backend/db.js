import mongoose from "mongoose";
const uri ="mongodb+srv://sumitnagra:sumit0004@cluster0.l3yrn89.mongodb.net/";

async function connectMongo() {
  try {
    await mongoose.connect(uri, { bufferCommands:true });
    console.log('Connected to MongoDB');
    // Perform other operations after connection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}


export default connectMongo 