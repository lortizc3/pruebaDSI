import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CharacterFilters } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() applyFilters = new EventEmitter<CharacterFilters>();
  @Output() resetFilters = new EventEmitter<void>();

  // Filter model
  filterModel: CharacterFilters = {
    species: [],
    status: '',
    dimension: '',
    ricknessLevel: 5
  };

  // Species options
  selectedSpecies: { [key: string]: boolean } = {
    human: false,
    alien: false,
    robot: false
  };

  toggle(): void {
    this.toggleSidebar.emit();
  }

  onApplyFilters(): void {
    // Build the species filter array from selected options
    this.filterModel.species = Object.keys(this.selectedSpecies)
      .filter(key => this.selectedSpecies[key]);
    
    this.applyFilters.emit(this.filterModel);
    
    // Close sidebar on mobile after applying filters
    if (window.innerWidth <= 576) {
      this.toggle();
    }
  }

  onResetFilters(): void {
    // Reset local filter model
    this.filterModel = {
      species: [],
      status: '',
      dimension: '',
      ricknessLevel: 5
    };
    
    // Reset checkboxes
    Object.keys(this.selectedSpecies).forEach(key => {
      this.selectedSpecies[key] = false;
    });
    
    this.resetFilters.emit();
    
    // Close sidebar on mobile after resetting filters
    if (window.innerWidth <= 576) {
      this.toggle();
    }
  }

  // Helper methods for the template
  updateSpeciesFilter(species: string, isChecked: boolean): void {
    this.selectedSpecies[species] = isChecked;
  }

  getRicknessLabel(): string {
    // Return a fun description based on the rickness level slider
    if (!this.filterModel.ricknessLevel) return 'Total Morty';
    
    const level = this.filterModel.ricknessLevel;
    if (level <= 2) return 'Mega Morty';
    if (level <= 4) return 'Morty-ish';
    if (level === 5) return 'Neutral';
    if (level <= 7) return 'Slightly Rickish';
    if (level <= 9) return 'Very Rick';
    return 'Total Rick';
  }
}
