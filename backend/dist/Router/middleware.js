"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "Iamaggodboy";
const getUserById = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please enter valid information" });
        return;
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Replace 'any' with the appropriate type if necessary
        req.user = data.user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).send("Please enter a valid token");
    }
};
exports.default = getUserById;
