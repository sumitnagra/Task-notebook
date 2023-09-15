import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, default: 'Genral' },
    date: {type:Date, default: Date.now }
})

const noteModel=mongoose.model('note',noteSchema);
export default noteModel;