import bcrypt from 'bcrypt';

interface User {
  email: string;
  password: string;
}

interface Token {
  token: string;
  userId: string;
}

const users: User[] = [];
const tokens: Token[] = [];

async function initializeAdmin(): Promise<void> {
  const adminEmail = 'admin';
  const adminPassword = 'admin';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  users.push({ email: adminEmail, password: hashedPassword });
  console.log('Admin account created');
}

function addUser(user: User): void {
  users.push(user);
}

function getUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

function addToken(token: Token): void {
  tokens.push(token);
}

function getToken(token: string): Token | undefined {
  return tokens.find(t => t.token === token);
}

export default {
  tokens,
  initializeAdmin,
  addUser,
  getUserByEmail,
  addToken,
  getToken,
}
