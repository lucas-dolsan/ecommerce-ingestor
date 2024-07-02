import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import storageService from '../storage';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';
const ENABLE_ADMIN = process.env.ENABLE_ADMIN === 'true';

async function initialMigration(): Promise<void> {
  if (ENABLE_ADMIN) {
    const adminEmail = 'admin';
    const adminPassword = 'admin';

    const existingAdmin = storageService.getUserByEmail(adminEmail);
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      storageService.addUser({ email: adminEmail, password: hashedPassword });
      console.log('Admin account created');
    }
  }
}

async function registerUser(email: string, password: string): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 10);
  storageService.addUser({ email, password: hashedPassword });
}

async function loginUser(email: string, password: string): Promise<string> {
  const user = storageService.getUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: email }, JWT_SECRET, { expiresIn: '1h' });
  storageService.addToken({ token, userId: email });
  return token;
}

async function verifyToken(token: string): Promise<any> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const storedToken = storageService.getToken(token);
    if (!storedToken) {
      throw new Error('Invalid token');
    }
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}

export default {
  initialMigration,
  registerUser,
  loginUser,
  verifyToken,
};
