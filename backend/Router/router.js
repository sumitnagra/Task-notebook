import express from 'express'
const router = express.Router()
import path from 'path';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';
import { body, validationResult } from 'express-validator';
import Usercontroller from './controller.js'
import getUserById from './middleware.js';
import NoteController from './notescontroller.js';

router.get('/',(req,res)=>{res.send("hello user")})
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/pdf', (req, res) => {
  const filePath = join(__dirname, '../Public/Sumitcv.pdf');

  res.sendFile(filePath);
}

)
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], Usercontroller.createUser)

router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], Usercontroller.Login)

router.post('/getuser', getUserById, Usercontroller.getUser)
router.get('/getallnotes', getUserById, NoteController.getAllNotes)
router.post('/addnotes', getUserById, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
], NoteController.addNotes)
router.put('/updatenotes/:id', getUserById, NoteController.updateNotes)
router.delete('/deletenotes/:id', getUserById, NoteController.deleteNotes)
router.post('/massege', NoteController.Massage)
router.get('/massege', NoteController.GetMassege)
export default router;