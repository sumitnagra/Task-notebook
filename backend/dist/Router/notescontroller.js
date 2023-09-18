"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Noteschema_1 = __importDefault(require("../modles/Noteschema")); // Assuming you have a note model with the appropriate typings
class NoteController {
    static getAllNotes = async (req, res) => {
        try {
            const notes = await Noteschema_1.default.find({ user: req.user.id });
            res.send(notes);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    };
    static addNotes = async (req, res) => {
        const { title, description, tag } = req.body;
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            const newNote = new Noteschema_1.default({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savedNote = await newNote.save();
            res.json(savedNote);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    };
    static updateNotes = async (req, res) => {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title)
            newNote.title = title;
        if (description)
            newNote.description = description;
        if (tag)
            newNote.tag = tag;
        try {
            const note = await Noteschema_1.default.findById(req.params.id);
            if (!note) {
                res.status(404).send("Not found");
                return;
            }
            if (note.user.toString() !== req.user.id) {
                res.status(401).send("Not allowed");
                return;
            }
            const updatedNote = await Noteschema_1.default.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json(updatedNote);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    };
    static deleteNotes = async (req, res) => {
        try {
            let note = await Noteschema_1.default.findById(req.params.id);
            if (!note) {
                res.status(404).send("Not found");
                return;
            }
            if (note.user.toString() !== req.user.id) {
                res.status(401).send("Not allowed");
                return;
            }
            note = await Noteschema_1.default.findByIdAndDelete(req.params.id);
            res.json({ success: "Note is deleted", note });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    };
}
exports.default = NoteController;
