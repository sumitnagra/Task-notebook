"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb+srv://sumitnagra:sumit0004@cluster0.l3yrn89.mongodb.net/";
async function connectMongo() {
    try {
        await mongoose_1.default.connect(uri, { bufferCommands: true });
        const connection = mongoose_1.default.connection;
        console.log('Connected to MongoDB');
        // Perform other operations after connection
        return connection;
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
exports.default = connectMongo;
