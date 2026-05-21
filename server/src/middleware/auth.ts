import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string; name?: string };
    }
  }
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = (req.headers['authorization'] || req.headers['Authorization']) as string | undefined;
  let token: string | undefined;
  if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.slice(7);
  if (!token) token = (req.headers['x-auth-token'] || req.headers['x-authentication']) as string | undefined;

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    if (!payload || !payload.id) return res.status(401).json({ error: 'Invalid token' });

    const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [payload.id]);
    if (!result.rows.length) return res.status(401).json({ error: 'Invalid token user' });

    req.user = result.rows[0];
    next();
  } catch (err) {
    console.error('authMiddleware error', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
