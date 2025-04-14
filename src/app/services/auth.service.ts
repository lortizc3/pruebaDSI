import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface User {
  username: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
  ];

  private currentUser: User | null = null;

  constructor() {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  login(username: string, password: string): Observable<User> {
    const user = this.users.find(u => u.username === username && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      this.currentUser = userWithoutPassword as User;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return of(this.currentUser);
    }
    
    return throwError(() => new Error('Invalid username or password'));
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  get currentUserValue(): User | null {
    return this.currentUser;
  }
}
