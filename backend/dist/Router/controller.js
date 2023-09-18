"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Userschema_1 = __importDefault(require("../modles/Userschema")); // Assuming you have a user model with the appropriate typings
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "Iamaggodboy";
class UserController {
    static createUser = async (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        try {
            let user = await Userschema_1.default.findOne({ email: req.body.email });
            if (user) {
                res.status(400).json({ error: "User already exists" });
                return;
            }
            const salt = await bcryptjs_1.default.genSalt(10);
            const secPass = await bcryptjs_1.default.hash(req.body.password, salt);
            const strongPass = await Userschema_1.default.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });
            const data = {
                user: {
                    id: strongPass.id,
                },
            };
            const jwtData = jsonwebtoken_1.default.sign(data, JWT_SECRET);
            res.send({ jwtData });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    };
    static login = async (req, res) => {
        let success = false;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { email, password } = req.body;
        try {
            let result = await Userschema_1.default.findOne({ email });
            if (!result) {
                res.status(400).json({ error: "Please enter correct email" });
                return;
            }
            const passwordCompare = await bcryptjs_1.default.compare(password, result.password);
            if (!passwordCompare) {
                res.status(400).json({ error: "Please enter correct email" });
                return;
            }
            const data = {
                user: {
                    id: result.id,
                },
            };
            const jwtData = jsonwebtoken_1.default.sign(data, JWT_SECRET);
            success = true;
            res.send({ success, jwtData });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    };
    static getUser = async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await Userschema_1.default.findById(userId).select("-password");
            res.send(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    };
}
exports.default = UserController;
