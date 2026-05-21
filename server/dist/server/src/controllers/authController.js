"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const db_1 = __importDefault(require("../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'email and password required' });
        try {
            const exists = yield db_1.default.query('SELECT id FROM users WHERE email = $1', [email]);
            if (exists.rows.length)
                return res.status(400).json({ error: 'User already exists' });
            const hashed = yield bcryptjs_1.default.hash(password, 10);
            const result = yield db_1.default.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email', [name || null, email, hashed]);
            const user = result.rows[0];
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
            res.json({ user, token });
        }
        catch (err) {
            console.error('register error', err);
            res.status(500).json({ error: 'server error' });
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'email and password required' });
        try {
            const result = yield db_1.default.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);
            if (!result.rows.length)
                return res.status(400).json({ error: 'Invalid credentials' });
            const user = result.rows[0];
            const match = yield bcryptjs_1.default.compare(password, user.password);
            if (!match)
                return res.status(400).json({ error: 'Invalid credentials' });
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
            // don't send password
            delete user.password;
            res.json({ user, token });
        }
        catch (err) {
            console.error('login error', err);
            res.status(500).json({ error: 'server error' });
        }
    });
}
exports.login = login;
