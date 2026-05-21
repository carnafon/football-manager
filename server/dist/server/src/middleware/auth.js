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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = (req.headers['authorization'] || req.headers['Authorization']);
        let token;
        if (authHeader && authHeader.startsWith('Bearer '))
            token = authHeader.slice(7);
        if (!token)
            token = (req.headers['x-auth-token'] || req.headers['x-authentication']);
        if (!token)
            return res.status(401).json({ error: 'No token provided' });
        try {
            const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            if (!payload || !payload.id)
                return res.status(401).json({ error: 'Invalid token' });
            const result = yield db_1.default.query('SELECT id, name, email FROM users WHERE id = $1', [payload.id]);
            if (!result.rows.length)
                return res.status(401).json({ error: 'Invalid token user' });
            req.user = result.rows[0];
            next();
        }
        catch (err) {
            console.error('authMiddleware error', err);
            return res.status(401).json({ error: 'Invalid token' });
        }
    });
}
exports.default = authMiddleware;
