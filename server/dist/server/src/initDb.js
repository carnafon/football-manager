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
exports.initDb = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./db"));
function initDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const p = path_1.default.resolve(__dirname, '../../scripts/db/init.sql');
        if (!fs_1.default.existsSync(p)) {
            console.log('No init SQL found at', p);
            return;
        }
        const sql = fs_1.default.readFileSync(p, 'utf8');
        const statements = sql.split(';').map(s => s.trim()).filter(Boolean);
        for (const stmt of statements) {
            try {
                yield db_1.default.query(stmt);
            }
            catch (err) {
                console.error('Error running init statement:', err);
            }
        }
        console.log('Database initialization complete');
    });
}
exports.initDb = initDb;
exports.default = initDb;
