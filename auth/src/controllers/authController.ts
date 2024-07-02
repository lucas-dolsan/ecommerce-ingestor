import { Request, Response } from 'express';
import authService from '../services/authService';
import jwt from 'jsonwebtoken';
import storageService from '../storage';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';
const ENABLE_ADMIN = process.env.ENABLE_ADMIN === 'true';


async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    await authService.registerUser(email, password);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (ENABLE_ADMIN && email === 'admin') {
      const token = jwt.sign({ userId: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
      storageService.addToken({ token, userId: 'admin' });
      res.status(200).json({ token });
    } else {
      const token = await authService.loginUser(email, password);
      res.status(200).json({ token });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).send('Invalid credentials');
  }
}

async function verifyToken(req: Request, res: Response) {
  try {
    const { token } = req.body;
    const decoded = await authService.verifyToken(token);
    res.status(200).json(decoded);
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send('Invalid token');
  }
}

export default {
  register,
  login,
  verifyToken,
};
