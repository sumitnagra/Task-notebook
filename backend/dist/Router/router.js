"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = __importDefault(require("./controller"));
const middleware_1 = __importDefault(require("./middleware"));
const notescontroller_1 = __importDefault(require("./notescontroller"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send("hello user");
});
router.post('/createuser', [
    (0, express_validator_1.body)('name').isLength({ min: 3 }),
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 5 }),
], controller_1.default.createUser);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').exists(),
], controller_1.default.login);
router.post('/getuser', middleware_1.default, controller_1.default.getUser);
router.get('/getallnotes', middleware_1.default, notescontroller_1.default.getAllNotes);
router.post('/addnotes', middleware_1.default, [
    (0, express_validator_1.body)('title').isLength({ min: 3 }),
    (0, express_validator_1.body)('description').isLength({ min: 5 }),
], notescontroller_1.default.addNotes);
router.put('/updatenotes/:id', middleware_1.default, notescontroller_1.default.updateNotes);
router.delete('/deletenotes/:id', middleware_1.default, notescontroller_1.default.deleteNotes);
exports.default = router;
