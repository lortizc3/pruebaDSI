import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string[];
  type?: string;
  gender?: string;
  dimension?: string;
  ricknessLevel?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/character/?page=${page}`);
  }

  getFilteredCharacters(page: number = 1, filters: CharacterFilters = {}): Observable<ApiResponse> {
    let params = new HttpParams().set('page', page.toString());
    
    // Apply standard API filters
    if (filters.name) params = params.set('name', filters.name);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.type) params = params.set('type', filters.type);
    if (filters.gender) params = params.set('gender', filters.gender);
    
    // Handle species array (API only supports single species value)
    if (filters.species && filters.species.length === 1) {
      params = params.set('species', filters.species[0]);
    }
    
    // Filter by dimension requires fetching from location
    if (filters.dimension) {
      // The API doesn't directly support dimension filtering, 
      // so we'll filter the results in the component
    }
    
    return this.http.get<ApiResponse>(`${this.apiUrl}/character`, { params });
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/character/${id}`);
  }
  
  // Get all locations for dimension filtering
  getLocations(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/location/?page=${page}`);
  }
  
  // Get episodes
  getEpisodes(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/episode/?page=${page}`);
  }
}
