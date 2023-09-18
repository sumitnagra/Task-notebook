"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for your note document
const noteSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, default: 'General' },
    date: { type: Date, default: Date.now },
});
// Define the model for your note document
const noteModel = mongoose_1.default.model('note', noteSchema);
exports.default = noteModel;
