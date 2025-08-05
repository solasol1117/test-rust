// Simple persistent user store for demo purposes
// In production, this would be a database

import fs from 'fs';
import path from 'path';

interface User {
  id: string;
  username: string;
  password: string;
  recoveryPhrase: string;
  createdAt: Date;
}

const USERS_FILE = path.join(process.cwd(), 'tmp', 'users.json');

// Ensure tmp directory exists
const ensureTmpDir = () => {
  const tmpDir = path.join(process.cwd(), 'tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
};

class UserStore {
  private loadUsers(): User[] {
    try {
      ensureTmpDir();
      if (fs.existsSync(USERS_FILE)) {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        const users = JSON.parse(data);
        // Convert createdAt strings back to Date objects
        return users.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt)
        }));
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
    
    // Return default test user if no file or error
    return [{
      id: "test-user-1",
      username: "test",
      password: "test",
      recoveryPhrase: "test abandon ability able about above absent absorb abstract absurd abuse access accident",
      createdAt: new Date()
    }];
  }

  private saveUsers(users: User[]): void {
    try {
      ensureTmpDir();
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  addUser(user: User): void {
    const users = this.loadUsers();
    users.push(user);
    this.saveUsers(users);
    console.log(`✅ User added: ${user.username}. Total users: ${users.length}`);
  }

  findUser(username: string): User | undefined {
    const users = this.loadUsers();
    return users.find(u => u.username === username);
  }

  userExists(username: string): boolean {
    const users = this.loadUsers();
    return users.some(u => u.username === username);
  }

  validateCredentials(username: string, password: string): User | null {
    const users = this.loadUsers();
    const user = users.find(u => u.username === username && u.password === password);
    console.log(`🔍 Login attempt: ${username}, Found user: ${!!user}, Total users: ${users.length}`);
    return user || null;
  }

  getAllUsers(): User[] {
    const users = this.loadUsers();
    return [...users]; // Return copy to prevent direct manipulation
  }

  // For debugging - remove in production
  getUserCount(): number {
    const users = this.loadUsers();
    return users.length;
  }
}

// Export a singleton instance
export const userStore = new UserStore();