import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RickAndMortyService, Character } from '../services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent implements OnInit {
  character: Character | null = null;
  loading: boolean = true;
  error: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rickAndMortyService: RickAndMortyService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadCharacter(+id);
      } else {
        this.error = 'Character ID not provided';
        this.loading = false;
      }
    });
  }
  
  loadCharacter(id: number): void {
    this.loading = true;
    this.rickAndMortyService.getCharacter(id).subscribe({
      next: (character) => {
        this.character = character;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load character details';
        this.loading = false;
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/characters']);
  }
  
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive': return 'status-alive';
      case 'dead': return 'status-dead';
      default: return 'status-unknown';
    }
  }
}
