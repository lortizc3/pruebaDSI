import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RickAndMortyService, Character, CharacterFilters } from '../services/rick-and-morty.service';
import { AuthService } from '../services/auth.service';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SidebarComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  loading: boolean = true;
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  username: string = '';
  isAdmin: boolean = false;
  
  // Sidebar and filter state
  isSidebarCollapsed: boolean = true;
  filters: CharacterFilters = {};
  activeFilters: boolean = false;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    this.username = currentUser?.username || '';
    this.isAdmin = currentUser?.role === 'admin';
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    
    if (this.activeFilters) {
      this.rickAndMortyService.getFilteredCharacters(this.currentPage, this.filters).subscribe({
        next: (response) => {
          this.characters = response.results;
          this.filteredCharacters = this.characters;
          this.totalPages = response.info.pages;
          this.loading = false;
          
          // Apply additional client-side filtering for dimension and rickness level if needed
          this.applyClientSideFilters();
        },
        error: (err) => {
          this.error = 'Failed to load characters';
          this.loading = false;
        }
      });
    } else {
      this.rickAndMortyService.getCharacters(this.currentPage).subscribe({
        next: (response) => {
          this.characters = response.results;
          this.filteredCharacters = this.characters;
          this.totalPages = response.info.pages;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load characters';
          this.loading = false;
        }
      });
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive': return 'status-alive';
      case 'dead': return 'status-dead';
      default: return 'status-unknown';
    }
  }
  
  // Sidebar toggle
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  
  // Apply filters from sidebar
  applyFilters(filters: CharacterFilters): void {
    this.filters = filters;
    this.activeFilters = 
      (filters.status !== undefined && filters.status !== '') ||
      (filters.species !== undefined && filters.species.length > 0) ||
      (filters.dimension !== undefined && filters.dimension !== '') ||
      (filters.ricknessLevel !== undefined && filters.ricknessLevel !== 5);
    
    this.currentPage = 1;
    this.loadCharacters();
  }
  
  // Reset filters
  resetFilters(): void {
    this.filters = {};
    this.activeFilters = false;
    this.currentPage = 1;
    this.loadCharacters();
  }
  
  // Apply additional client-side filtering
  applyClientSideFilters(): void {
    // Skip if no additional filters
    if (!this.filters.dimension && this.filters.ricknessLevel === undefined) {
      return;
    }
    
    this.filteredCharacters = this.characters.filter(character => {
      let passFilter = true;
      
      // Filter by dimension (client-side)
      if (this.filters.dimension && this.filters.dimension !== '') {
        passFilter = passFilter && (
          character.location.name.includes(this.filters.dimension) || 
          character.origin.name.includes(this.filters.dimension)
        );
      }
      
      // The "rickness level" is a client-side fun filter that doesn't really exist in the API
      // For example, we could base it on the number of episodes a character appears in
      // or other criteria
      
      return passFilter;
    });
  }
}
