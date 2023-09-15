import mongoose from "mongoose";

const MassageSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    massege: { type: String, required: true } // Fixed the typo from "massege" to "message"
});

const MassegeModel = mongoose.model('message', MassageSchema); // Fixed the typo from "MassegeModal" to "MessageModel"
MassegeModel.createIndexes();

export default MassegeModel;
