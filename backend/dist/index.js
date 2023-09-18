"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const router_1 = __importDefault(require("./Router/router"));
const cors_1 = __importDefault(require("cors"));
const port = parseInt(process.env.PORT || '8080', 10);
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', router_1.default);
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
