import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class HarrypotterService {
  private baseUrl = 'https://hp-api.onrender.com/api';
  private charactersCache: Character[] = [];

  constructor(private http: HttpClient) {}

  getAllCharacters(): Observable<Character[]> {
    if (this.charactersCache.length > 0) {
      return of(this.charactersCache);
    }

    return this.http.get<Character[]>(`${this.baseUrl}/characters`).pipe(
      tap((data) => {
        this.charactersCache = data;
      })
    );
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http.get<Character[]>(
      `${this.baseUrl}/characters/house/${encodeURIComponent(house)}`
    );
  }

  getCharacterById(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getCharacterFromCache(id: string): Character | undefined {
    return this.charactersCache.find(character => character.id === id);
  }

  setCharactersCache(characters: Character[]): void {
    this.charactersCache = characters;
  }
}