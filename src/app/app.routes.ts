import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'characters', 
    component: CharactersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'character/:id',
    component: CharacterDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminGuard]
  },
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
