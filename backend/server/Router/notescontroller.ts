import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import noteModel, { INote } from '../modles/Noteschema'; // Assuming you have a note model with the appropriate typings

class NoteController {
  static getAllNotes = async (req: Request, res: Response): Promise<void> => {
    try {
      const notes = await noteModel.find({ user: req.user.id });
      res.send(notes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  };

  static addNotes = async (req: Request, res: Response): Promise<void> => {
    const { title, description, tag } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      const newNote: INote = new noteModel({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await newNote.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  };

  static updateNotes = async (req: Request, res: Response): Promise<void> => {
    const { title, description, tag } = req.body;
    const newNote: Partial<INote> = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    try {
      const note = await noteModel.findById(req.params.id);
      if (!note) {
        res.status(404).send("Not found");
        return;
      }

      if (note.user.toString() !== req.user.id) {
        res.status(401).send("Not allowed");
        return;
      }

      const updatedNote = await noteModel.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );

      res.json(updatedNote);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  };

  static deleteNotes = async (req: Request, res: Response): Promise<void> => {
    try {
      let note = await noteModel.findById(req.params.id);
      if (!note) {
        res.status(404).send("Not found");
        return;
      }

      if (note.user.toString() !== req.user.id) {
        res.status(401).send("Not allowed");
        return;
      }

      note = await noteModel.findByIdAndDelete(req.params.id);
      res.json({ success: "Note is deleted", note });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  };
}

export default NoteController;
