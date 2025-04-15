import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  username: string = '';
  users: User[] = [];
  loading: boolean = true;
  error: string = '';
  editingUser: User | null = null;
  editForm: { username: string, role: 'admin' | 'user' } = { username: '', role: 'user' };
  showAddForm: boolean = false;
  newUser: User = { username: '', role: 'user' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.currentUserValue?.username || '';
    this.loadUsers();
  }

  loadUsers(): void {
    // Simulate loading users from the service
    this.loading = true;
    
    setTimeout(() => {
      this.users = [
        { username: 'admin', role: 'admin' },
        { username: 'user', role: 'user' },
        { username: 'rick', role: 'user' },
        { username: 'morty', role: 'user' }
      ];
      this.loading = false;
    }, 1000);
  }

  startEdit(user: User): void {
    this.editingUser = user;
    this.editForm = { ...user };
  }

  cancelEdit(): void {
    this.editingUser = null;
  }

  saveEdit(): void {
    if (!this.editingUser) return;
    
    const index = this.users.findIndex(u => u.username === this.editingUser!.username);
    if (index !== -1) {
      this.users[index] = { ...this.editForm } as User;
      // In a real app, we would call a service to update the user
    }
    this.editingUser = null;
  }

  deleteUser(user: User): void {
    if (user.username === this.username) {
      this.error = "You cannot delete your own account!";
      setTimeout(() => this.error = '', 3000);
      return;
    }
    
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.users = this.users.filter(u => u.username !== user.username);
      // In a real app, we would call a service to delete the user
    }
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      this.newUser = { username: '', role: 'user' };
    }
  }

  addUser(): void {
    if (!this.newUser.username.trim()) {
      this.error = "Username cannot be empty";
      setTimeout(() => this.error = '', 3000);
      return;
    }

    // Check if username already exists
    if (this.users.some(u => u.username === this.newUser.username)) {
      this.error = "Username already exists";
      setTimeout(() => this.error = '', 3000);
      return;
    }

    this.users.push({ ...this.newUser });
    this.showAddForm = false;
    // In a real app, we would call a service to add the user
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }

  getAdminCount(): number {
    return this.users.filter(u => u.role === 'admin').length;
  }
  
  goToCharacters(): void {
    this.router.navigate(['/characters']);
  }
}
