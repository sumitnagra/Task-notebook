import { Router } from 'express';
import { body } from 'express-validator';
import Usercontroller from './controller';
import getUserById from './middleware';
import NoteController from './notescontroller';

const router = Router();

router.get('/', (req, res) => {
  res.send("hello user");
});

router.post('/createuser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
], Usercontroller.createUser);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists(),
], Usercontroller.login);

router.post('/getuser', getUserById, Usercontroller.getUser);
router.get('/getallnotes', getUserById, NoteController.getAllNotes);
router.post('/addnotes', getUserById, [
  body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 5 }),
], NoteController.addNotes);

router.put('/updatenotes/:id', getUserById, NoteController.updateNotes);
router.delete('/deletenotes/:id', getUserById, NoteController.deleteNotes);

export default router;
