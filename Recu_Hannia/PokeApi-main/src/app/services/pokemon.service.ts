import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  type: string;
  generation: number;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'http://127.0.0.1:8000/pokemons/';

  constructor(private http: HttpClient) {}

  addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Pokemon>(this.baseUrl, pokemon, { headers });
  }  

  getPokemons(skip: number = 0, limit: number = 10): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.baseUrl}?skip=${skip}&limit=${limit}`).pipe(
      map((data: any[]) => {
        return data.map((item: any) => ({
          id: item.id,
          name: item.name || 'Unknown',
          type: item.type || 'Unknown', // Dejar `type` como string
          generation: item.generation || 0,
        }));
      })
    );
  }  
  
  deletePokemon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }

  updatePokemon(id: number, pokemon: Partial<Pokemon>): Observable<Pokemon> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Pokemon>(`${this.baseUrl}${id}/`, pokemon, { headers }); // Asegurar la barra final
  }
  
}
