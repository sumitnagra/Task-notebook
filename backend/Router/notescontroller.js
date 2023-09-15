import noteModel from '../modles/Noteschema.js'
import MassegeModal from '../modles/massegeSchema.js';
import { body, validationResult } from 'express-validator';


class NoteController {

    static getAllNotes = async (req, res) => {
        try {

            const note = await noteModel.find({ user: req.user.id })
            res.send(note)

        } catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }
    }
    //Router 2
    static addNotes = async (req, res) => {
        const { title, description, tag } = req.body;
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }
            const notes = new noteModel({
                title, description, tag, user: req.user.id
            })
            const savenotes = await notes.save()
            res.json(savenotes)
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }
    }
    //Rouetr 3
    static updateNotes = async (req, res) => {
        const { title, description, tag } = req.body

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        try {

            var note = await noteModel.findById(req.params.id);
            if (!note) { return res.status(404).send("Not found") }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed");
            }

            var note = await noteModel.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note);
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")

        }
    }

    static deleteNotes = async (req, res) => {
        try {
            let note = await noteModel.findById(req.params.id);
            if (!note) {
                res.status(404).send("Not found");
            }
            if (note.user.toString() !== req.user.id) {
                res.status(401).send("Not allowed")
            }
            note = await noteModel.findByIdAndDelete(req.params.id)
            res.json({ "success": "Note is deleted", note: note })
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }

    }
    // add massage 
    static Massage=async(req,res)=>{
        const {firstname,lastname,email,subject,massege}=req.body;
        try {
          const sendmassege=  new MassegeModal({
            firstname,lastname,email,subject,massege
          })
          const saveMassege=await sendmassege.save();
          res.json(saveMassege)
        } catch (error) {
            console.log(error)
        }
    }
    static GetMassege=async(req,res)=>{
        try {
            let masseges= await MassegeModal.find();
            res.send(masseges)

        } catch (error) {
            console.log(error)
        }

    }
}
export default NoteController;